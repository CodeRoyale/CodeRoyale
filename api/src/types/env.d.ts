/* eslint-disable */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
      LOBBY_SECRET: string;
      POSTGRES_DBNAME: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
    }
  }
}

export {};
