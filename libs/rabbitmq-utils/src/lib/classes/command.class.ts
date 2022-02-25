import { MessageClass } from './message.class';
import { ICommand } from '@evento/microservices-utils';

export abstract class CommandClass<PayloadType>
  extends MessageClass<PayloadType>
  implements ICommand<PayloadType>
{
  constructor(type, version, payload) {
    super(type, version, payload);
  }
}
