import { Module } from '@nestjs/common';

import { DecisionService } from './decisions/decision.service';
import { GoingsOnCommandsDriversConsumerModule } from '@evento/goings-on-commands-drivers-consumer';
import { GoingsOnEventsDriversProducerModule } from '@evento/goings-on-events-drivers-producer';
import { ApplyService } from './applies/apply.service';
import { GoingsOnMongoDriversIoModule } from '@evento/goings-on-mongo-drivers-io';
import { GoingsOnEventsDriversConsumerModule } from '@evento/goings-on-events-drivers-consumer';

@Module({
  imports: [
    GoingsOnCommandsDriversConsumerModule,
    GoingsOnEventsDriversProducerModule,
    GoingsOnEventsDriversConsumerModule,
    GoingsOnMongoDriversIoModule,
  ],
  providers: [DecisionService, ApplyService],
})
export class AppModule {}
