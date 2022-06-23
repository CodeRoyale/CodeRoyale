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
let RoomResolver = class RoomResolver {
    createRoom(input) {
        return Room_1.Room.create(Object.assign({ id: (0, uuid_1.v4)() }, input)).save();
    }
    rooms() {
        return Room_1.Room.find({});
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Room_1.Room),
    (0, type_graphql_1.UseMiddleware)(isLobby_1.isLobby),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoomInput]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "createRoom", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Room_1.Room]),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomResolver.prototype, "rooms", null);
RoomResolver = __decorate([
    (0, type_graphql_1.Resolver)(Room_1.Room)
], RoomResolver);
exports.RoomResolver = RoomResolver;
//# sourceMappingURL=room.js.map