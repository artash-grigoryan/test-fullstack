import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { IGoingsOnEvent } from '@evento/goings-on-models';

@Schema()
export class GoingsOnMongoEventDocument
  extends Document
  implements IGoingsOnEvent
{
  @Prop({ unique: true })
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
  @Prop()
  date: string;

  @Prop()
  email: string;
}

export const GoingsOnMongoEventSchema = SchemaFactory.createForClass(
  GoingsOnMongoEventDocument
);
