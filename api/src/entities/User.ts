import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Connection } from "./Connection";
import { Room } from "./Room";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  profilePicture!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  bio: string | null;

  @Field()
  @Column({ type: "int", default: 0 })
  following: number;

  @Field()
  @Column({ type: "int", default: 0 })
  followers: number;

  @OneToMany(() => Connection, (follow) => follow.user)
  connections: Connection[];

  @OneToMany(() => Room, (room) => room.creator)
  rooms: Room[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
