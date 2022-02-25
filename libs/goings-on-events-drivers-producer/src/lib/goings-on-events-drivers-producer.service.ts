import { Injectable } from '@nestjs/common';
import {
  RABBITMQ_EVENTS_EXCHANGE,
  RABBITMQ_EVENTS_ROUTING_KEY,
  RabbitMQClient,
} from '@evento/rabbitmq-utils';
import { IEvent } from '@evento/microservices-utils';

@Injectable()
export class GoingsOnEventsDriversProducerService extends RabbitMQClient {
  make<TPayload, T extends IEvent<TPayload>>(
    cls: new (context: { ms: string }, payload: TPayload) => T
  ): (context: { ms: string }, payload: TPayload) => Promise<unknown> {
    return async (
      context: { ms: string },
      payload: TPayload
    ): Promise<void> => {
      await this.publish(
        RABBITMQ_EVENTS_EXCHANGE,
        RABBITMQ_EVENTS_ROUTING_KEY,
        new cls(context, payload)
      );
    };
  }
}
