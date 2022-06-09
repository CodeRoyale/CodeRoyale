"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = exports.UpdateUserInput = exports.RegisterInput = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const validateAuthOptions_1 = require("../utils/validateAuthOptions");
const constants_1 = require("../utils/constants");
const isAuth_1 = require("../middleware/isAuth");
const validateUpdateUserOptions_1 = require("../utils/validateUpdateUserOptions");
const Connection_1 = require("../entities/Connection");
const toFollowingUserIdsArr_1 = require("../utils/toFollowingUserIdsArr");
const typeorm_1 = require("typeorm");
let RegisterInput = class RegisterInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "accessToken", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "profilePicture", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "name", void 0);
RegisterInput = __decorate([
    (0, type_graphql_1.InputType)()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let UpdateUserInput = class UpdateUserInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "bio", void 0);
UpdateUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    email(user, { req }) {
        if (req.session.userId === user.id) {
            return user.email;
        }
        return "";
    }
    async connectionStatus(user, { req }) {
        const { userId } = req.session;
        if (!userId) {
            return null;
        }
        const connection = await Connection_1.Connection.findOne({
            where: { userId, followingUserId: user.id },
        });
        return connection ? true : false;
    }
    me({ req }) {
        if (!req.session.userId) {
            return null;
        }
        return User_1.User.findOne({ where: { id: req.session.userId } });
    }
    async user(username) {
        const user = await User_1.User.findOne({ where: { username } });
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
    async updateUser(options, { req, dataSource }) {
        const errors = (0, validateUpdateUserOptions_1.validateUpdateUserOptions)(options);
        if (errors) {
            return { errors };
        }
        let user;
        try {
            const result = await dataSource
                .createQueryBuilder()
                .update(User_1.User)
                .set({
                username: options.username,
                name: options.name,
                bio: options.bio,
            })
                .where("id = :id", { id: req.session.userId })
                .returning("*")
                .execute();
            user = result.raw[0];
        }
        catch (error) {
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
    async connect(followingUserId, wantsToFollow, { req, dataSource }) {
        const { userId } = req.session;
        const connection = await Connection_1.Connection.findOne({
            where: { userId, followingUserId },
        });
        if (connection && wantsToFollow) {
        }
        else if (!connection && wantsToFollow) {
            await dataSource.transaction(async (tm) => {
                await tm.query(`
          insert into connection ("userId", "followingUserId")
          values ($1, $2)
          `, [userId, followingUserId]);
                await tm.query(`
          update public.user
          set following = following + 1
          where id = $1
          `, [userId]);
                await tm.query(`
          update public.user
          set followers = followers + 1
          where id = $1
          `, [followingUserId]);
            });
        }
        else if (connection && !wantsToFollow) {
            await dataSource.transaction(async (tm) => {
                await tm.query(`
          delete from connection
          where "userId" = $1 and "followingUserId" = $2
          `, [userId, followingUserId]);
                await tm.query(`
          update public.user
          set following = following - 1
          where id = $1
          `, [userId]);
                await tm.query(`
          update public.user
          set followers = followers - 1
          where id = $1
          `, [followingUserId]);
            });
        }
        return true;
    }
    async people({ req, dataSource }) {
        const { userId } = req.session;
        const result = await dataSource.query(`
      select c."followingUserId" from connection c
      inner join public.user u on u.id = c."userId"
      where c."userId" = $1
      `, [userId]);
        const followingUserIds = (0, toFollowingUserIdsArr_1.toFollowingUserIdsArr)(result);
        const people = await User_1.User.findBy({
            id: (0, typeorm_1.In)(followingUserIds),
        });
        return people;
    }
    async login(email, { req }) {
        const user = await User_1.User.findOne({
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
        req.session.userId = user.id;
        return { user };
    }
    async register(options, { req, dataSource }) {
        const errors = await (0, validateAuthOptions_1.validateAuthOptions)(options);
        if (errors) {
            return { errors };
        }
        let user;
        try {
            const result = await dataSource
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values({
                email: options.email,
                username: options.username,
                name: options.name,
                profilePicture: options.profilePicture,
            })
                .returning("*")
                .execute();
            user = result.raw[0];
        }
        catch (error) {
            console.log("error: ", error);
            if (error.code === "23505") {
                return {
                    errors: [{ field: "username", message: "Username already exists" }],
                };
            }
        }
        req.session.userId = user.id;
        return { user };
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((error) => {
            if (error) {
                resolve(false);
                return;
            }
            res.clearCookie(constants_1.COOKIE_NAME);
            resolve(true);
        }));
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => String),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "email", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => Boolean, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "connectionStatus", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Query)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("followingUserId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("wantsToFollow")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "connect", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "people", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map