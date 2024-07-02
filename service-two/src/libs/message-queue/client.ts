import amqp from 'amqplib';

import { ConnectionParameters } from 'message-queue';

import Connection from './connection';

class Client {
  private readonly _host: string;

  private readonly _port: number;

  private readonly _username: string;

  private readonly _password: string;

  constructor({ host, port, username, password }: ConnectionParameters) {
    this._host = host;
    this._port = port;
    this._username = username;
    this._password = password;
  }

  public async connect(): Promise<Connection> {
    const connection = await amqp.connect({
      hostname: this._host,
      port: this._port,
      username: this._username,
      password: this._password
    });

    return new Connection(connection);
  }
}

export default Client;
