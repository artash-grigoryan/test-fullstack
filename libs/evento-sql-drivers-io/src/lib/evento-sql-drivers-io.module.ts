import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoingsOnEntity } from './entites';
import { EventoSqlDriversIoService } from './evento-sql-drivers-io.service';
import { CreateEventoTable1645787490297 } from './migrations';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'EVENTO_CONNECTION',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'evento',
      migrationsRun: true,
      synchronize: false,
      migrations: [CreateEventoTable1645787490297],
      logging: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([GoingsOnEntity], 'EVENTO_CONNECTION'),
  ],
  providers: [EventoSqlDriversIoService],
  exports: [EventoSqlDriversIoService],
})
export class EventoSqlDriversIoModule {}
