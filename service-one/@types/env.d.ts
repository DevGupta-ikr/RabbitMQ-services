interface Env extends NodeJS.ProcessEnv {
  NODE_ENV: string;
  MQ_HOSTNAME: string;
  MQ_PORT: number;
  MQ_USERNAME: string;
  MQ_PASSWORD: string;
}

export default Env;
