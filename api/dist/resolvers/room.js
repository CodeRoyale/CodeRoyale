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
exports.RoomResolver = void 0;
const uuid_1 = require("uuid");
const type_graphql_1 = require("type-graphql");
const Room_1 = require("../entities/Room");
const isLobby_1 = require("../middleware/isLobby");
const isAuth_1 = require("../middleware/isAuth");
const User_1 = require("../entities/User");
let RoomInput = class RoomInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RoomInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], RoomInput.prototype, "private", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], RoomInput.prototype, "creatorId", void 0);
RoomInput = __decorate([
    (0, type_graphql_1.InputType)()
], RoomInput);
let PaginatedRooms = class PaginatedRooms {
};
__decorate([
    (0, type_graphql_1.Field)(() => [Room_1.Room]),
    __metadata("design:type", Array)
], PaginatedRooms.prototype, "rooms", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaginatedRooms.prototype, "hasMore", void 0);
PaginatedRooms = __decorate([
    (0, type_graphql_1.ObjectType)()
], PaginatedRooms);
let RoomResolver = class RoomResolver {
    creator(room, { userLoader }) {
        return userLoader.load(room.creatorId);
    }
    createRoom(input) {
        return Room_1.Room.create(Object.assign({ id: (0, uuid_1.v4)() }, input)).save();
    }
    async rooms(limit, cursor, isPrivate, { dataSource }) {
        console.log(isPrivate);
        const realLimit = Math.min(30, limit);
        const realLimitPlusOne = realLimit + 1;
        const replacements = [realLimitPlusOne];
        console.log("date format: ", new Date(parseInt(cursor)));
        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }
        const rooms = await dataSource.query(`
      select r.*
      from room r
      ${cursor ? `where r."createdAt" < $2` : ""}
      order by r."createdAt" DESC
      limit $1
    `, replacements);
        return {
            rooms: rooms.slice(0, realLimit),
            hasMore: rooms.length === realLimitPlusOne,
        };
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(() => User_1.User),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Room_1.Room, Object]),
    __metadata("design:returntype", void 0)
], RoomResolver.prototype, "creator", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Room_1.Room),
    (0, type_graphql_1.UseMiddleware)(isLobby_1.isLobby),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoomInput]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "createRoom", null);
__decorate([
    (0, type_graphql_1.Query)(() => PaginatedRooms),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("limit", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("cursor", () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("isPrivate")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Boolean, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "rooms", null);
RoomResolver = __decorate([
    (0, type_graphql_1.Resolver)(Room_1.Room)
], RoomResolver);
exports.RoomResolver = RoomResolver;
//# sourceMappingURL=room.js.map