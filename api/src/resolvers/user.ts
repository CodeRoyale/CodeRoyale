import { User } from "../entities/User";
import { MyContext } from "../types/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { validateAuthOptions } from "../utils/validateAuthOptions";
import { COOKIE_NAME } from "../utils/constants";
import { isAuth } from "../middleware/isAuth";
import { validateUpdateUserOptions } from "../utils/validateUpdateUserOptions";
import { Connection } from "../entities/Connection";
import { toFollowingUserIdsArr } from "../utils/toFollowingUserIdsArr";
import { In } from "typeorm";

@InputType()
export class RegisterInput {
  @Field()
  accessToken: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  profilePicture: string;

  @Field()
  name: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  bio: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(
    @Root()
    user: User,
    @Ctx()
    { req }: MyContext
  ) {
    // email address should be private, you should only be able to see your own email address
    if (req.session.userId === user.id) {
      return user.email;
    }

    return "";
  }

  @FieldResolver(() => Boolean, { nullable: true })
  async connectionStatus(
    @Root()
    user: User,
    @Ctx()
    { req }: MyContext
  ) {
    const { userId } = req.session;

    if (!userId) {
      return null;
    }

    const connection = await Connection.findOne({
      where: { userId, followingUserId: user.id },
    });

    return connection ? true : false;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // not logged in
    if (!req.session.userId) {
      return null;
    }

    return User.findOne({ where: { id: req.session.userId } });
  }

  @Query(() => UserResponse)
  async user(
    @Arg("username")
    username: string
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username doesnot exist",
          },
        ],
      };
    }

    return {
      user,
    };
  }

  @Query(() => UserResponse)
  @UseMiddleware(isAuth)
  async userFromId(
    @Arg("userId", () => Int)
    userId: number
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return {
        errors: [
          {
            field: "id",
            message: "userId doesnot exist",
          },
        ],
      };
    }

    return { user };
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async users(
    @Arg("userIds", () => [Int])
    userIds: number[]
  ) {
    return User.findBy({
      id: In(userIds),
    });
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async updateUser(
    @Arg("options")
    options: UpdateUserInput,
    @Ctx()
    { req, dataSource }: MyContext
  ): Promise<UserResponse> {
    const errors = validateUpdateUserOptions(options);
    if (errors) {
      return { errors };
    }

    let user;

    try {
      const result = await dataSource
        .createQueryBuilder()
        .update(User)
        .set({
          username: options.username,
          name: options.name,
          bio: options.bio,
        })
        .where("id = :id", { id: req.session.userId })
        .returning("*")
        .execute();

      user = result.raw[0];
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "Username already exists",
            },
          ],
        };
      }
      console.log("updateUser error", error);
    }

    return { user };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async connect(
    @Arg("followingUserId", () => Int)
    followingUserId: number,
    @Arg("wantsToFollow")
    wantsToFollow: boolean,
    @Ctx()
    { req, dataSource }: MyContext
  ): Promise<boolean> {
    const { userId } = req.session;

    const connection = await Connection.findOne({
      where: { userId, followingUserId },
    });

    // user already follows
    if (connection && wantsToFollow) {
    } else if (!connection && wantsToFollow) {
      await dataSource.transaction(async (tm) => {
        await tm.query(
          `
          insert into connection ("userId", "followingUserId")
          values ($1, $2)
          `,
          [userId, followingUserId]
        );

        await tm.query(
          `
          update public.user
          set following = following + 1
          where id = $1
          `,
          [userId]
        );

        await tm.query(
          `
          update public.user
          set followers = followers + 1
          where id = $1
          `,
          [followingUserId]
        );
      });
    } else if (connection && !wantsToFollow) {
      await dataSource.transaction(async (tm) => {
        await tm.query(
          `
          delete from connection
          where "userId" = $1 and "followingUserId" = $2
          `,
          [userId, followingUserId]
        );

        await tm.query(
          `
          update public.user
          set following = following - 1
          where id = $1
          `,
          [userId]
        );

        await tm.query(
          `
          update public.user
          set followers = followers - 1
          where id = $1
          `,
          [followingUserId]
        );
      });
    }

    return true;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async people(
    @Ctx()
    { req, dataSource }: MyContext
  ) {
    const { userId } = req.session;

    const result = await dataSource.query(
      `
      select c."followingUserId" from connection c
      inner join public.user u on u.id = c."userId"
      where c."userId" = $1
      `,
      [userId]
    );

    const followingUserIds = toFollowingUserIdsArr(result);

    const people = await User.findBy({
      id: In(followingUserIds),
    });

    return people;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email")
    email: string,
    @Ctx()
    { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "Email doesn't exists",
          },
        ],
      };
    }

    // login user
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options")
    options: RegisterInput,
    @Ctx()
    { req, dataSource }: MyContext
  ): Promise<UserResponse> {
    const errors = await validateAuthOptions(options);
    if (errors) {
      return { errors };
    }

    let user;
    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: options.email,
          username: options.username,
          name: options.name,
          profilePicture: options.profilePicture,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (error) {
      console.log("error: ", error);
      if (error.code === "23505") {
        return {
          errors: [{ field: "username", message: "Username already exists" }],
        };
      }
    }

    // logging the user in
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(
    @Ctx()
    { req, res }: MyContext
  ) {
    return new Promise((resolve) =>
      req.session.destroy((error) => {
        if (error) {
          resolve(false);
          return;
        }

        res.clearCookie(COOKIE_NAME);
        resolve(true);
      })
    );
  }
}
