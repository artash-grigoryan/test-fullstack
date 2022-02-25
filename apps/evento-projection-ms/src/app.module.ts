import { Module } from '@nestjs/common';

import { ApplyService } from './applies/apply.service';
import { GoingsOnEventsDriversConsumerModule } from '@evento/goings-on-events-drivers-consumer';
import { EventoSqlDriversIoModule } from '@evento/evento-sql-drivers-io';
import { GoingsOnCommandsDriversConsumerModule } from '@evento/goings-on-commands-drivers-consumer';
import { GoingsOnEventsDriversProducerModule } from '@evento/goings-on-events-drivers-producer';
import { GoingsOnMongoDriversIoModule } from '@evento/goings-on-mongo-drivers-io';

@Module({
  imports: [
    GoingsOnCommandsDriversConsumerModule,
    GoingsOnEventsDriversProducerModule,
    GoingsOnEventsDriversConsumerModule,
    GoingsOnMongoDriversIoModule,
    EventoSqlDriversIoModule,
  ],
  providers: [ApplyService],
})
export class AppModule {}
