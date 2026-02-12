
import * as joi from 'joi';

export const environmentValidationSchema = joi.object({
    NODE_ENV: joi.string().valid('development', 'production', 'test', 'provision', 'dev').default('development'),
    DB_PORT: joi.number().port().default(5432),
    DB_PASSWORD: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
});