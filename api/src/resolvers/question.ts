// getRandomQuestionIds(noOfIds)
// getTestcases(questionId)
import { Testcase } from "../entities/Testcase";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { In } from "typeorm";
import { Question } from "../entities/Question";
import { isLobby } from "../middleware/isLobby";
import { MyContext } from "../types/types";
import { isAuth } from "../middleware/isAuth";

@Resolver(Question)
export class QuestionResolver {
  @Mutation(() => Question)
  createQuestion(
    @Arg("title")
    title: string,
    @Arg("problemCode")
    problemCode: string,
    @Arg("description")
    description: string
  ): Promise<Question> {
    return Question.create({
      title,
      problemCode,
      description,
    }).save();
  }

  @Mutation(() => Boolean)
  async createTestcase(
    @Arg("questionId")
    questionId: number,
    @Arg("input")
    input: string,
    @Arg("output")
    output: string,
    @Ctx()
    { dataSource }: MyContext
  ) {
    await dataSource.transaction(async (tm) => {
      await tm.query(
        `
        insert into testcase ("questionId", input, output)
        values ($1, $2, $3)
        `,
        [questionId, input, output]
      );

      await tm.query(
        `
        update question
        set "numberOfTestcases" = "numberOfTestcases" + 1
        where id = $1
        `,
        [questionId]
      );
    });

    return true;
  }

  @Query(() => [Question])
  @UseMiddleware(isAuth)
  questions(
    @Arg("questionIds", () => [Int])
    questionIds: number[]
  ) {
    return Question.findBy({ id: In(questionIds) });
  }

  @Query(() => [Testcase])
  testcases(
    @Arg("questionId")
    questionId: number
  ) {
    return Testcase.find({ where: { questionId } });
  }

  @Query(() => [Int])
  @UseMiddleware(isLobby)
  async getRandomQuestionIds(
    @Arg("noOfIds")
    noOfIds: number,
    @Ctx()
    { dataSource }: MyContext
  ) {
    // format -> [ { id: 11 }, { id: 14 } ]
    const randomIdsObj: { id: number }[] = await dataSource.query(
      `select id from question order by random() limit $1`,
      [noOfIds]
    );

    // making it into [12, 13, etc etc]
    const randomIds = randomIdsObj.map((element) => element.id);

    return randomIds;
  }
}
