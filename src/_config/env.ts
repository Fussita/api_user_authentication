import 'dotenv/config'
import * as joi from 'joi';

interface EnvironmentVariables {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    JWT_SECRET_KEY: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    JWT_SECRET_KEY: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`)

const envVars: EnvironmentVariables = value

export const envs = {
    port: envVars.PORT,
    dbHost: envVars.DB_HOST,
    dbPort: envVars.DB_PORT,
    dbUsername: envVars.DB_USERNAME,
    dbPassword: envVars.DB_PASSWORD,
    dbName: envVars.DB_NAME,
    JWT_SECRET_KEY: envVars.JWT_SECRET_KEY,
}