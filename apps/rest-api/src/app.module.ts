import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GoingsOnCommandsDriversProducerModule } from '@evento/goings-on-commands-drivers-producer';

@Module({
  imports: [GoingsOnCommandsDriversProducerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
