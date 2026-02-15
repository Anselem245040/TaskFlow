import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';


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
  entities: [path.join(process.cwd(), 'src/**/*.entity.{ts,js}')],
  migrations: [path.join(process.cwd(), 'src/core/database/migrations/*.{ts,js}')],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
};


export const AppDataSource = new DataSource(dataSourceOptions);