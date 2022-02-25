import { v4 } from 'uuid';
import { IMessage } from '@evento/microservices-utils';

export abstract class MessageClass<PayloadType>
  implements IMessage<PayloadType>
{
  id: string;
  date: string;
  timestamp: number;
  version: string;
  type: string;
  payload: PayloadType;

  constructor(type, version, payload) {
    const d = new Date();
    this.id = v4();
    this.type = type;
    this.version = version;
    this.payload = payload;
    this.timestamp = d.valueOf();
    this.date = d.toDateString();
  }
}
