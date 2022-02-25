import { Injectable, Logger } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  RABBITMQ_EVENTS_EXCHANGE,
  RABBITMQ_EVENTS_ROUTING_KEY,
  RABBITMQ_EVENTS_RPC_EVENTO_PROJECTION_QUEUE,
} from '@evento/rabbitmq-utils';
import { IEvent } from '@evento/microservices-utils';

import {
  GoingsOnEventEventCreatedMessage,
  GoingsOnEventsTypesEnum,
} from '@evento/goings-on-models';
import { EventoSqlDriversIoService } from '@evento/evento-sql-drivers-io';

@Injectable()
export class ApplyService {
  protected readonly logger = new Logger(ApplyService.name);

  constructor(private readonly mongoService: EventoSqlDriversIoService) {}

  @RabbitRPC({
    exchange: RABBITMQ_EVENTS_EXCHANGE,
    routingKey: RABBITMQ_EVENTS_ROUTING_KEY,
    queue: RABBITMQ_EVENTS_RPC_EVENTO_PROJECTION_QUEUE,
    allowNonJsonMessages: true,
    queueOptions: {
      autoDelete: true,
    },
  })
  async rpc(event: IEvent<unknown>): Promise<void> {
    this.logger.debug(`Event received in projection:${event.type}`);
    switch (event.type) {
      case GoingsOnEventsTypesEnum.EVENT_CREATED:
        await this.createEventProjectionApply(
          event as GoingsOnEventEventCreatedMessage
        );
        break;
    }
  }

  async createEventProjectionApply(
    event: GoingsOnEventEventCreatedMessage
  ): Promise<void> {
    this.logger.debug(event.payload);
    await this.mongoService.saveGoingsOnEntity(event.payload);
  }
}
