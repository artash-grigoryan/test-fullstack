import { Body, Controller, Logger, Post } from '@nestjs/common';
import {
  GoingsOnApiCreateEventPayload,
  GoingsOnCommandCreateEventMessage,
} from '@evento/goings-on-models';
import { GoingsOnCommandsDriversProducerService } from '@evento/goings-on-commands-drivers-producer';

@Controller()
export class AppController {
  protected readonly logger = new Logger(AppController.name);

  constructor(
    private readonly service: GoingsOnCommandsDriversProducerService
  ) {}

  @Post('/event/create')
  async createEventoEvent(
    @Body() payload: GoingsOnApiCreateEventPayload
  ): Promise<any> {
    this.logger.log('#Evento RestAPI : createEvent', payload);
    return await this.service.request(GoingsOnCommandCreateEventMessage)(
      payload
    );
  }
}
