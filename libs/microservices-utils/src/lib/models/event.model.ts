import { IMessage } from './message.model';

export interface IEvent<PayloadType> extends IMessage<PayloadType> {
  context: {
    ms: string;
  };
}
