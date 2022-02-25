export interface IMessage<PayloadType> {
  id: string;
  version: string;
  date: string;
  timestamp: number;
  type: string;
  payload: PayloadType;
}
