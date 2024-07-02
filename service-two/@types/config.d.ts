interface MQBinding {
  queue: string;
  routing_key: string;
}

interface MQService {
  exchange: string;
  bindings: Array<MQBinding>;
}

interface MQConfig {
  sub: Array<MQService>;
  pub: Array<MQService>;
}

export default MQConfig;
