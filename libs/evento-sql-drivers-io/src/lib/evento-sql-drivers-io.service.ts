import { Injectable, Logger } from '@nestjs/common';
import { IGoingsOnEvent } from '@evento/goings-on-models';
import { GoingsOnEntity } from './entites';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  SelectQueryBuilder,
  WhereExpressionBuilder,
} from 'typeorm';

@Injectable()
export class EventoSqlDriversIoService {
  private readonly logger = new Logger(EventoSqlDriversIoService.name);

  constructor(
    @InjectRepository(GoingsOnEntity, 'EVENTO_CONNECTION')
    private goingsOnRepository: Repository<GoingsOnEntity>
  ) {}

  async getGoingsOnWithQueryBuilder(
    skip: number,
    take: number,
    filters: {
      idGoingsOn?: string;
      name?: string;
      date?: string;
    },
    ordering: { field: string; value: 'ASC' | 'DESC' }[]
  ): Promise<[GoingsOnEntity[], number]> {
    const query = this.goingsOnRepository.createQueryBuilder('t');
    this.whereQuery(query, filters);
    this.orderQuery(query, ordering);

    take !== -1 && query.take(take).skip(skip);
    this.logger.debug(query.getSql());
    return query.getManyAndCount();
  }

  async saveGoingsOnEntity(dto: IGoingsOnEvent): Promise<void> {
    const { id, ...data } = dto;
    let goingsOn: GoingsOnEntity = await this.goingsOnRepository.findOne(id);
    if (!goingsOn) {
      goingsOn = new GoingsOnEntity();
      Object.assign(goingsOn, { ...data, idGoingsOn: id });
    }

    await this.goingsOnRepository.save(goingsOn);
  }

  whereQuery(query: WhereExpressionBuilder, filters: any, alias = 't'): void {
    Object.keys(filters).forEach((filterKey) => {
      if (typeof filters?.[filterKey] === 'object') {
        this.whereQuery(query, filters?.[filterKey], filterKey);
      } else if (filters?.[filterKey]?.indexOf('%') >= 0) {
        query.andWhere(`${alias}.${filterKey} like :${filterKey}`, {
          [filterKey]: filters[filterKey],
        });
      } else if (filters?.[filterKey]) {
        query.andWhere(`${alias}.${filterKey}=:${filterKey}`, {
          [filterKey]: filters[filterKey],
        });
      }
    });
  }

  orderQuery(
    query: SelectQueryBuilder<any>,
    ordering: any[],
    alias = 't'
  ): void {
    ordering.map((order) =>
      query.addOrderBy(
        order.field.split('.').length > 1
          ? order.field
          : `${alias}.${order.field}`,
        order.value
      )
    );
  }
}
