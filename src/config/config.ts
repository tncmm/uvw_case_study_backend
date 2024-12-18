import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT??"0",10),
  log_level: 'debug',
  tokenExpireDurationInMinutes: parseInt(process.env.TOKEN_EXPIRE_DURATION_IN_MINUTES || '10080', 10),
  jwt_private_key: process.env.JWT_PRIVATE_KEY || '',

};
if (!config.jwt_private_key) {
  throw new Error('Missing JWT_PRIVATE_KEY in environment variables');
}