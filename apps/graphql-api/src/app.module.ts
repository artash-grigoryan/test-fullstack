import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { EventoGoingsOnResolver } from './resolvers/evento-goings-on.resolver';
import { EventoSqlDriversIoModule } from '@evento/evento-sql-drivers-io';

@Module({
  imports: [
    EventoSqlDriversIoModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        path: '/graphql',
        onConnect: (connectionParams) => {
          console.log('connectionParams');
          console.log(connectionParams);
        },
        keepAlive: 1000,
      },
      typePaths: ['./**/*.graphql'],
    }),
  ],
  providers: [EventoGoingsOnResolver],
})
export class AppModule {}
