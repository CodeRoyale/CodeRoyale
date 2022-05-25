import { User } from "../entities/User";
import { MyContext } from "../types/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { validateAuthOptions } from "../utils/validateAuthOptions";
import { COOKIE_NAME } from "../utils/constants";

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
