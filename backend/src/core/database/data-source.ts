// src/core/database/data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const isCompiled = __filename.endsWith('.js');

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'railway',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: [path.join(__dirname, '../../**/*.entity' + (isCompiled ? '.js' : '.ts'))],
  migrations: [path.join(__dirname, 'migrations/*' + (isCompiled ? '.js' : '.ts'))],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
};

export const AppDataSource = new DataSource(dataSourceOptions);