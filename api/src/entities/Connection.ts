import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

// many <-> many relationship

@Entity()
export class Connection extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  followingUserId: number;

  @ManyToMany(() => User, (user) => user.connections)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
