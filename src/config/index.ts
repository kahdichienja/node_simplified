import dotenv from 'dotenv';

dotenv.config();

const appConfigs = {
    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3001,
    mongoUrl: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/bet-api2',
    bodyLimit: process.env.BODY_LIMIT || '100kb'
};

export default appConfigs;
