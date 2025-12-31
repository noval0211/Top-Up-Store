import { config } from 'dotenv';
const ENV = `.env.${process.env.NODE_ENV || 'development'}.local`
config({path: ENV});
