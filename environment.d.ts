/// <reference types="next" />

declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_SRV: string;
    CLOUDINARY_URL: string;
    JWT_SECRET: string;
    STRIPE_SECRET_KEY: string;
  }
}