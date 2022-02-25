import { IMessage } from './message.model';

export type ICommand<PayloadType> = IMessage<PayloadType>;
