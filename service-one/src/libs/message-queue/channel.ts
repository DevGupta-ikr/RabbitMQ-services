import amqp from 'amqplib';

class Channel {
  private readonly _channel: amqp.Channel;

  constructor(channel: amqp.Channel) {
    this._channel = channel;
  }

  public async createQueue(
    queue: string,
    queueOptions?: amqp.Options.AssertQueue | undefined
  ): Promise<amqp.Replies.AssertQueue> {
    const _queueOptions = {
      durable: true,
      ...queueOptions
    };

    return this._channel.assertQueue(queue, _queueOptions);
  }

  public async bindQueue(
    queue: string,
    exchange: string,
    bindingKey: string,
    channelOptions?: { prefetch?: boolean | undefined } | undefined,
    queueOptions?: amqp.Options.AssertQueue | undefined
  ): Promise<amqp.Replies.Empty> {
    const _channelOptions = {
      prefetch: false,
      ...channelOptions
    };

    const _queueOptions = {
      durable: true,
      ...queueOptions
    };

    if (_channelOptions.prefetch) await this._channel.prefetch(1);

    await this.createQueue(queue, _queueOptions);

    return this._channel.bindQueue(queue, exchange, bindingKey);
  }

  public async subscribe(
    queue: string,
    exchange: string,
    bindingKey: string,
    onMessage: (msg: amqp.ConsumeMessage | null) => void,
    channelOptions?: { prefetch?: boolean | undefined } | undefined,
    queueOptions?: amqp.Options.AssertQueue | undefined,
    consumeOptions?: amqp.Options.Consume | undefined
  ): Promise<amqp.Replies.Consume> {
    await this.bindQueue(
      queue,
      exchange,
      bindingKey,
      channelOptions,
      queueOptions
    );

    const _channelOptions = {
      prefetch: false,
      ...channelOptions
    };

    const _consumeOptions = {
      noAck: false,
      ...consumeOptions
    };

    if (_channelOptions.prefetch) await this._channel.prefetch(1);

    return this._channel.consume(queue, onMessage, _consumeOptions);
  }

  public publish(
    content: Buffer,
    exchange: string,
    routingKey: string,
    options?: amqp.Options.Publish | undefined
  ): boolean {
    return this._channel.publish(exchange, routingKey, content, options);
  }

  public acknowledge(
    message: amqp.Message,
    allUpTo?: boolean | undefined
  ): void {
    this._channel.ack(message, allUpTo);
  }

  public async close(): Promise<void> {
    await this._channel.close();
  }
}

export default Channel;
