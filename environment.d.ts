declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string;
      WEB_HOST: string;
      DB_PORT: string;
      DB_HOST: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      NEXT_PUBLIC_SERVER_HOST: string;
      NEXT_PUBLIC_OPTION_NOTE_MIN_LENGTH: string;
      NEXT_PUBLIC_OPTION_NOTE_MAX_LENGTH: string;
      NEXT_PUBLIC_OPTION_NOTES_PER_PAGE: string;
    }
  }
}

export {};
