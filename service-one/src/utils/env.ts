import dotenv from 'dotenv';

import Env from 'env';

dotenv.config({ path: '.env' });

const env = process.env as Env;

export default env;
