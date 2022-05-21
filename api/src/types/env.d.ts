/* eslint-disable */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      DATABASE_URL: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
    }
  }
}

export {};
