import path from 'path';
import dotenv from 'dotenv-safe';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongo: {
    uri: process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
