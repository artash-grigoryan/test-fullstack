import { Injectable, Logger } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  RABBITMQ_EVENTS_EXCHANGE,
  RABBITMQ_EVENTS_ROUTING_KEY,
  RABBITMQ_EVENTS_RPC_GOINGS_ON_DOMAIN_QUEUE,
} from '@evento/rabbitmq-utils';
import { IEvent } from '@evento/microservices-utils';

import {
  GoingsOnEventEventCreatedMessage,
  GoingsOnEventsTypesEnum,
} from '@evento/goings-on-models';
import { GoingsOnMongoDriversIoService } from '@evento/goings-on-mongo-drivers-io';

@Injectable()
export class ApplyService {
  protected readonly logger = new Logger(ApplyService.name);

  constructor(private readonly mongoService: GoingsOnMongoDriversIoService) {}

  @RabbitRPC({
    exchange: RABBITMQ_EVENTS_EXCHANGE,
    routingKey: RABBITMQ_EVENTS_ROUTING_KEY,
    queue: RABBITMQ_EVENTS_RPC_GOINGS_ON_DOMAIN_QUEUE,
    allowNonJsonMessages: true,
    queueOptions: {
      autoDelete: true,
    },
  })
  async rpc(event: IEvent<unknown>): Promise<void> {
    this.logger.debug(`Event received:${event.type}`);
    switch (event.type) {
      case GoingsOnEventsTypesEnum.EVENT_CREATED:
        await this.createEventApply(event as GoingsOnEventEventCreatedMessage);
        break;
    }
  }

  async createEventApply(
    event: GoingsOnEventEventCreatedMessage
  ): Promise<void> {
    await this.mongoService.saveGoingsOn(event.payload);
  }
}
