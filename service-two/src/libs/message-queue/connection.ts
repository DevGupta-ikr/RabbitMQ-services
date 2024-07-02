import amqp from 'amqplib';

import Channel from './channel';

class Connection {
  private readonly _connection: amqp.Connection;

  private readonly _channels: Array<amqp.Channel>;

  constructor(connection: amqp.Connection) {
    this._connection = connection;
    this._channels = [];
  }

  public async createChannel(): Promise<Channel> {
    const channel = await this._connection.createChannel();
    this._channels.push(channel);
    return new Channel(channel);
  }

  public async close(): Promise<void> {
    await Promise.all(this._channels.map(ch => ch.close()));
    await this._connection.close();
  }
}

export default Connection;
