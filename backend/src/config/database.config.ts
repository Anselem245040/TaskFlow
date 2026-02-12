import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean | { rejectUnauthorized: boolean };
  entities: string[];
  migrations: string[];
  synchronize: boolean;
}

export const databaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'taskflow_user',
  password: process.env.DB_PASSWORD || 'taskflow_password',
  database: process.env.DB_NAME || 'taskflow_db',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
};

export default registerAs(
  "database",
  (): TypeOrmModuleOptions => ({
    type: "postgres",
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    ssl: databaseConfig.ssl,
    entities: databaseConfig.entities,
    migrations: databaseConfig.migrations,
    synchronize: databaseConfig.synchronize,
  })
);
