import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoingsOnMongoEventSchema } from './schemas';
import { GoingsOnMongoDriversIoService } from './goings-on-mongo-drivers-io.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/db-mongo-local',
      {
        connectionName: 'db-mongo-local',
      }
    ),
    MongooseModule.forFeature(
      [{ name: 'GoingsOnList', schema: GoingsOnMongoEventSchema }],
      'db-mongo-local'
    ),
  ],
  providers: [GoingsOnMongoDriversIoService],
  exports: [GoingsOnMongoDriversIoService],
})
export class GoingsOnMongoDriversIoModule {}
