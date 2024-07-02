import { Client as MQClient } from './libs/message-queue';

import env from './utils/env';

const subBinding = {
  exchange: 'content',
  routingKey: 'rtk2',
  queue: 'que1'
};

const pubBinding = {
  exchange: 'content',
  routingKey: 'rtk3'
};

const pubMessage = 'message from service-two to service-three';

void (async (): Promise<void> => {
  try {
    const mqClient = new MQClient({
      host: env.MQ_HOSTNAME,
      port: env.MQ_PORT,
      username: env.MQ_USERNAME,
      password: env.MQ_PASSWORD
    });

    const connection = await mqClient.connect();

    const channel = await connection.createChannel();

    console.log(`Listening to queue '${subBinding.queue}' for messages ...`);

    await channel.subscribe(
      subBinding.queue,
      subBinding.exchange,
      subBinding.routingKey,
      message => {
        if (message !== null && typeof message !== 'undefined') {
          console.log(
            `${message.fields.routingKey} => ${message.content.toString()}`
          );

          console.log('Working ...');

          setTimeout(() => {
            channel.publish(
              Buffer.from(pubMessage),
              pubBinding.exchange,
              pubBinding.routingKey
            );

            channel.acknowledge(message);

            console.log(
              `Message sent to exchange '${pubBinding.exchange}' with '${pubBinding.routingKey}' routing key.`
            );

            console.log(
              `Listening to queue '${subBinding.queue}' for messages ...`
            );
          }, 6000);
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
})();
