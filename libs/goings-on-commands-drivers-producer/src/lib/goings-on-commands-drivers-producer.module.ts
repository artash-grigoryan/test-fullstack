import { Module } from '@nestjs/common';
import { GoingsOnCommandsDriversProducerService } from './goings-on-commands-drivers-producer.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RABBITMQ_COMMANDS_EXCHANGES } from '@evento/rabbitmq-utils';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: RABBITMQ_COMMANDS_EXCHANGES,
          type: 'topic',
        },
      ],
      uri: 'amqp://root:root@localhost:5672/evento',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [GoingsOnCommandsDriversProducerService],
  exports: [GoingsOnCommandsDriversProducerService],
})
export class GoingsOnCommandsDriversProducerModule {}
