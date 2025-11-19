import { envs } from '../envs';

export const postgresConnection = {
  host: envs.database.host || 'localhost',
  port: envs.database.port || 5432,
  username: envs.database.username || 'postgres',
  password: envs.database.password || 'your_password',
  database: envs.database.name || 'your_database',
};
