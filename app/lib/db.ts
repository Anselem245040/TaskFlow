import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../../generated/prisma/client';
import { env } from "../lib/env";

const connectionString = env.DATABASE_URL;

export const adapter = new PrismaNeon({ connectionString });
export const prisma = new PrismaClient({ adapter });