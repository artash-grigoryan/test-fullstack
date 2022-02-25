import { Injectable } from '@nestjs/common';
import {
  RABBITMQ_COMMANDS_RPC_GOINGS_ON_DOMAIN_ROUTING_KEY,
  RabbitMQClient,
} from '@evento/rabbitmq-utils';
import { ICommand } from '@evento/microservices-utils';

@Injectable()
export class GoingsOnCommandsDriversProducerService extends RabbitMQClient {
  request<TPayload, T extends ICommand<TPayload>>(
    cls: new (payload: TPayload) => T
  ): (payload: TPayload) => Promise<unknown> {
    return async (payload: TPayload): Promise<unknown> => {
      return this.sendCommandRPC(
        RABBITMQ_COMMANDS_RPC_GOINGS_ON_DOMAIN_ROUTING_KEY,
        new cls(payload)
      );
    };
  }
}
