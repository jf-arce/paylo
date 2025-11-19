export const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  NODE_ENV,
  DATABASE_TYPE,
} = process.env;

export const envs = {
  database: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    name: DATABASE_NAME,
    type: DATABASE_TYPE,
  },
  nodeEnv: NODE_ENV,
};
