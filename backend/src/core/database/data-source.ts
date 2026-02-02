import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';


dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'taskflow_user',
  password: process.env.DB_PASSWORD || 'taskflow_password',
  database: process.env.DB_NAME || 'taskflow_db',
  ssl:
    process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/core/database/migrations/*.ts'],
  synchronize: false,
};


export const AppDataSource = new DataSource(dataSourceOptions);