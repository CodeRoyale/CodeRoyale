import { v4 as uuid } from "uuid";
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
import { Room } from "../entities/Room";
import { isLobby } from "../middleware/isLobby";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types/types";
import { User } from "../entities/User";

@InputType()
class RoomInput {
  @Field()
  title: string;
  @Field()
  private: boolean;
  @Field()
  maxMembers: number;
  @Field()
  creatorId: number;
}

@ObjectType()
class PaginatedRooms {
  @Field(() => [Room])
  rooms: Room[];
  @Field()
  hasMore: boolean;
}

@Resolver(Room)
export class RoomResolver {
  @FieldResolver(() => User)
  creator(
    @Root()
    room: Room,
    @Ctx()
    { userLoader }: MyContext
  ) {
    return userLoader.load(room.creatorId);
  }

  @Mutation(() => Room)
  // only lobby is allowed to use this funct!
  @UseMiddleware(isLobby)
  createRoom(
    @Arg("input")
    input: RoomInput
  ): Promise<Room> {
    return Room.create({
      id: uuid(),
      ...input,
    }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isLobby)
  async deleteRoom(
    @Arg("roomId")
    id: string
  ): Promise<boolean> {
    const room = await Room.findOne({ where: { id } });
    if (!room) {
      return false;
    }

    await Room.delete({ id });

    return true;
  }

  @Query(() => PaginatedRooms)
  @UseMiddleware(isAuth)
  async rooms(
    @Arg("limit", () => Int)
    limit: number,
    @Arg("cursor", () => String, { nullable: true })
    cursor: string | null,
    @Arg("isPrivate")
    isPrivate: boolean,
    @Ctx()
    { dataSource }: MyContext
  ): Promise<PaginatedRooms> {
    const realLimit = Math.min(30, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    let rooms;
    if (isPrivate) {
      rooms = await dataSource.query(
        `
        select r.*
        from room r
        ${cursor ? `where r."createdAt" < $2 and r.private` : "where r.private"}
        order by r."createdAt" DESC
        limit $1
      `,
        replacements
      );
    } else {
      rooms = await dataSource.query(
        `
        select r.*
        from room r
        ${
          cursor
            ? `where r."createdAt" < $2 and not r.private`
            : "where not r.private"
        }
        order by r."createdAt" DESC
        limit $1
      `,
        replacements
      );
    }

    return {
      rooms: rooms.slice(0, realLimit),
      hasMore: rooms.length === realLimitPlusOne,
    };
  }
}
