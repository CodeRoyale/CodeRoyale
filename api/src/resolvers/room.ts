import { v4 as uuid } from "uuid";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Room } from "../entities/Room";
import { isLobby } from "../middleware/isLobby";
import { isAuth } from "../middleware/isAuth";

@InputType()
class RoomInput {
  @Field()
  title: string;
  @Field()
  private: boolean;
  @Field()
  creatorId: number;
}

@Resolver(Room)
export class RoomResolver {
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

  @Query(() => [Room])
  @UseMiddleware(isAuth)
  rooms() {
    return Room.find({});
  }
}
