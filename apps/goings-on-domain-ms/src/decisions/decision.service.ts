import { Injectable, Logger } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { v4 } from 'uuid';
import {
  RABBITMQ_COMMANDS_EXCHANGES,
  RABBITMQ_COMMANDS_RPC_GOINGS_ON_DOMAIN_QUEUE,
  RABBITMQ_COMMANDS_RPC_GOINGS_ON_DOMAIN_ROUTING_KEY,
} from '@evento/rabbitmq-utils';
import { ICommand } from '@evento/microservices-utils';
import { GoingsOnEventsDriversProducerService } from '@evento/goings-on-events-drivers-producer';
import {
  GoingsOnCommandCreateEventMessage,
  GoingsOnCommandsTypesEnum,
  GoingsOnEventEventCreatedMessage,
} from '@evento/goings-on-models';
import { GoingsOnMongoDriversIoService } from '@evento/goings-on-mongo-drivers-io';

@Injectable()
export class DecisionService {
  protected readonly logger = new Logger(DecisionService.name);

  constructor(
    private readonly eventProducer: GoingsOnEventsDriversProducerService,
    private readonly mongoService: GoingsOnMongoDriversIoService
  ) {}

  // TODO(): [Artash] - 25/02/2022 - Create decorators for listeners
  @RabbitRPC({
    exchange: RABBITMQ_COMMANDS_EXCHANGES,
    routingKey: RABBITMQ_COMMANDS_RPC_GOINGS_ON_DOMAIN_ROUTING_KEY,
    queue: RABBITMQ_COMMANDS_RPC_GOINGS_ON_DOMAIN_QUEUE,
    allowNonJsonMessages: true,
    queueOptions: {
      autoDelete: true,
    },
  })
  async rpc(command: ICommand<unknown>): Promise<void> {
    this.logger.debug(`Command received:${command.type}`);
    switch (command.type) {
      case GoingsOnCommandsTypesEnum.CREATE_EVENT:
        await this.createGoingsOnEvent(
          command as GoingsOnCommandCreateEventMessage
        );
    }
  }

  async createGoingsOnEvent(
    command: GoingsOnCommandCreateEventMessage
  ): Promise<void | Error> {
    const goingsOn = await this.mongoService.getGoingsOnById(
      command.payload.email
    );
    if (goingsOn) {
      return new Error('Email already exists');
    }
    await this.eventProducer.make(GoingsOnEventEventCreatedMessage)(
      { ms: 'goings-on' },
      {
        id: v4(),
        ...command.payload,
      }
    );
  }
}
