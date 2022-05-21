import { User } from "../entities/User";
import { MyContext } from "../types/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { validateAuthOptions } from "../utils/validateAuthOptions";

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

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // not logged in
    if (!req.session.userId) {
      return null;
    }

    return User.findOne({ where: { id: req.session.userId } });
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
}
