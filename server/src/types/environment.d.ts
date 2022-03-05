type Environment = 'dev' | 'prod' | 'test';

interface ProjectEnv {
  NODE_ENV: Environment;
  LOG_LEVEL: 'info' | 'error' | 'silent';
  DB_NAME: string;
  DB_SYNCHRONIZE: string;
  DB_DROPSCHEMA: string;
  DB_LOGGING: string;
  DB_PORT: string;
  DB_HOST: string
  DB_USERNAME: string
  DB_PASSWORD: string
  JWT_SECRET: string
}

declare namespace NodeJS {
  interface ProcessEnv extends Partial<ProjectEnv> {}
}
