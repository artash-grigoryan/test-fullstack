import { Module } from '@nestjs/common';
import { GoingsOnEventsDriversProducerService } from './goings-on-events-drivers-producer.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RABBITMQ_EVENTS_EXCHANGE } from '@evento/rabbitmq-utils';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: RABBITMQ_EVENTS_EXCHANGE,
          type: 'topic',
        },
      ],
      uri: 'amqp://root:root@localhost:5672/evento',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [GoingsOnEventsDriversProducerService],
  exports: [GoingsOnEventsDriversProducerService],
})
export class GoingsOnEventsDriversProducerModule {}
