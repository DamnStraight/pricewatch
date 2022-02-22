import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// Add type safety to our process.env calls
export const env = (name: keyof ProjectEnv, fallback?: string): string => {
  const val = process.env[name];

  if (!val) {
    if (fallback) {
      return fallback;
    }

    throw new Error(`Missing environment variable [${name}]`);
  }

  return val;
};

export const ormconfig = (): PostgresConnectionOptions => {
  return {
    type        : 'postgres',
    port        : Number(env('DB_PORT')),
    host        : env('DB_HOST', 'localhost'),
    database    : env('DB_NAME'),
    synchronize : env('DB_SYNCHRONIZE') === 'true',
    logging     : env('DB_LOGGING') === 'true',
    dropSchema  : env('DB_DROPSCHEMA') === 'true',
    username    : env('DB_USERNAME'),
    password    : env('DB_PASSWORD'),
    entities    : ['src/entity/**/*.ts'],
    migrations  : ['src/migration/**/*.ts'],
    subscribers : ['src/subscriber/**/*.ts'],
  };
};
