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
import { Testcase } from "./Testcase";

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column({ type: "text" })
  description!: string;

  // TODO: add this when doing migrations
  // https://stackoverflow.com/questions/35699564/min-and-max-length-of-a-varchar-in-postgres
  @Field()
  @Column({ unique: true })
  problemCode!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  numberOfTestcases!: number;

  @Field(() => Testcase)
  @OneToMany(() => Testcase, (testcase) => testcase.questionId)
  testcases: Testcase[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: string;
}
