import { MessageClass } from './message.class';
import { IEvent } from '@evento/microservices-utils';

export abstract class EventClass<PayloadType>
  extends MessageClass<PayloadType>
  implements IEvent<PayloadType>
{
  context: {
    ms: string;
  };

  constructor(type, version, context, payload) {
    super(type, version, payload);
    this.context = context;
  }
}
