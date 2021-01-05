/// <reference types="next" />

declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_SRV: string;
  }
}