import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd, '.env')) });

export default {
  port: process.env.PORT,
  dataBaseURL: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
