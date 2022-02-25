import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GoingsOnMongoEventDocument } from '@evento/goings-on-mongo-drivers-io';
import { IGoingsOnEvent } from '@evento/goings-on-models';

@Injectable()
export class GoingsOnMongoDriversIoService {
  private readonly logger = new Logger(GoingsOnMongoDriversIoService.name);

  constructor(
    @InjectModel('GoingsOnList')
    private readonly goingsOnModel: Model<GoingsOnMongoEventDocument>
  ) {}

  async getGoingsOnById(email: string): Promise<GoingsOnMongoEventDocument> {
    return await this.goingsOnModel.findOne({ email }, { _id: 0 }).exec();
  }

  async saveGoingsOn(dto: IGoingsOnEvent): Promise<void> {
    const goingsOn = await this.goingsOnModel
      .findOne({ id: dto.id }, { _id: 0 })
      .exec();

    if (goingsOn) {
      await this.goingsOnModel.replaceOne({ id: dto.id }, dto).exec();
    } else {
      await this.goingsOnModel.insertMany(dto);
    }
  }
}
