import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Question } from "./Question";

@ObjectType()
@Entity()
export class Testcase extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "text" })
  input!: string;

  @Field()
  @Column({ type: "text" })
  output!: string;

  // foreign key that references the Questions table
  @Field()
  @Column()
  questionId: number;

  @ManyToOne(() => Question, (question) => question.testcases)
  question: Question;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: string;
}
