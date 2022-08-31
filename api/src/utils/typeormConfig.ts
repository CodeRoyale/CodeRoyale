// import path from "path";
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import { Connection } from "../entities/Connection";
import { Room } from "../entities/Room";
import { Question } from "../entities/Question";
import { Testcase } from "../entities/Testcase";

// https://github.com/typeorm/typeorm/issues/8810#issuecomment-1090650075
export const dataSource = new DataSource({
  type: "postgres",
  database: "coderoyale-dev",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logging: true,
  synchronize: true,
  // migrations: [path.join(__dirname, "./migrations/*")],
  entities: [User, Connection, Room, Question, Testcase],
});
