import { Args, Query, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import {
  EventoSqlDriversIoService,
  GoingsOnEntity,
} from '@evento/evento-sql-drivers-io';

@Resolver('GoingsOn')
export class EventoGoingsOnResolver {
  private readonly logger = new Logger(EventoGoingsOnResolver.name);

  constructor(private readonly goingsOnSqlDriver: EventoSqlDriversIoService) {}

  @Query()
  async goingsOns(
    @Args('page', { defaultValue: 0 }) page: number,
    @Args('size', { defaultValue: 10 }) size: number,
    @Args('filters', { defaultValue: {} })
    filters: {
      name?: string;
      date?: string;
    },
    @Args('order', { defaultValue: [] })
    order: { field: string; value: 'ASC' | 'DESC' }[]
  ): Promise<{ data: unknown[]; totalCount: number }> {
    const [data, count] =
      await this.goingsOnSqlDriver.getGoingsOnWithQueryBuilder(
        page * size,
        size,
        filters,
        order
      );
    data.reverse();

    return {
      totalCount: count,
      data: data.map((goingsOn: GoingsOnEntity) => this.toPayload(goingsOn)),
    };
  }

  @Query()
  async goingsOn(
    @Args('id', { defaultValue: 0 }) id: string
  ): Promise<unknown> {
    const [data, count] =
      await this.goingsOnSqlDriver.getGoingsOnWithQueryBuilder(
        0,
        1,
        {
          idGoingsOn: id,
        },
        []
      );
    return this.toPayload(data[0]);
  }

  toPayload(goingsOn: GoingsOnEntity): unknown {
    return {
      id: goingsOn.idGoingsOn,
      name: goingsOn.name,
      date: goingsOn.date,
      description: goingsOn.description,
      email: goingsOn.email,
      createdAt: goingsOn.createdAt,
      updatedAt: goingsOn.updatedAt,
    };
  }
}
