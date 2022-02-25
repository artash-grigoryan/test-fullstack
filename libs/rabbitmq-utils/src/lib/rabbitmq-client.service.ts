import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';

import { ICommand, IEvent } from '@evento/microservices-utils';
import {
  RABBITMQ_COMMANDS_EXCHANGES,
  RABBITMQ_COMMANDS_STORE_EXCHANGE,
  RABBITMQ_COMMANDS_STORE_ROUTING_KEY,
} from './constants/rabbitmq.constants';

@Injectable()
export class RabbitMQClient {
  constructor(protected readonly amq: AmqpConnection) {}

  protected readonly logger = new Logger(RabbitMQClient.name);

  protected async publish(
    exchange: string,
    routingKey: string,
    message: ICommand<unknown> | IEvent<unknown>
  ): Promise<void> {
    this.logger.verbose(`Publish message ${message.type} v${message.version}`);
    return this.amq.publish(exchange, routingKey, message);
  }

  protected async sendCommandRPC<T extends Record<string, unknown>>(
    routingKey: string,
    command: ICommand<unknown>,
    options: { store: boolean } = { store: false }
  ): Promise<T> {
    if (options.store) {
      await this.publish(
        RABBITMQ_COMMANDS_STORE_EXCHANGE,
        RABBITMQ_COMMANDS_STORE_ROUTING_KEY,
        command
      );
    }
    return this.amq.request<T>({
      exchange: RABBITMQ_COMMANDS_EXCHANGES,
      routingKey: routingKey,
      payload: command,
    });
  }
}
