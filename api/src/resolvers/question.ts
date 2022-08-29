// getRandomQuestionIds(noOfIds)
// getTestcases(questionId)
import { Question } from "../entities/Question";
// import { isLobby } from "../middleware/isLobby";
// import { MyContext } from "../types/types";
import { Query } from "type-graphql";
// import { Arg, Ctx, Int, Mutation, Query, UseMiddleware } from "type-graphql";

export class QuestionResolver {
  // // ! remove this after inserting questions!!!!! IMP
  // @Mutation(() => Question)
  // createQuestion(
  //   @Arg("title")
  //   title: string,
  //   @Arg("description")
  //   description: string
  // ): Promise<Question> {
  //   return Question.create({
  //     title,
  //     description,
  //   }).save();
  // }

  @Query(() => [Question])
  questions() {
    return Question.find({});
  }

  // @Query(() => [Int])
  // @UseMiddleware(isLobby)
  // getRandomQuestionIds(
  //   @Arg("noOfIds")
  //   noOfIds: number,
  //   @Ctx()
  //   { dataSource }: MyContext
  // ) {}
}
