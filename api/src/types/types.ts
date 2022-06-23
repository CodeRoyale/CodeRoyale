import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { IncomingHttpHeaders } from "http";
import { DataSource } from "typeorm";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData & { userId?: number }>;
    headers: IncomingHttpHeaders & { "lobby-secret"?: string };
  };
  res: Response;
  dataSource: DataSource;
};

export type GoogleUser = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
};
