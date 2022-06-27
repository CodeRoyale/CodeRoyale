import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Room extends BaseEntity {
  @Field()
  @PrimaryColumn({ unique: true })
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column({ type: "bool" })
  private: boolean;

  @Field()
  @Column()
  maxMembers!: number;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.rooms)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
