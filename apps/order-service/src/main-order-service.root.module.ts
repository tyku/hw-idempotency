import { ConfigModule, ConfigService } from '@nestjs/config';
import { common, database } from '@app/order-service/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderServiceModule } from '@app/order-service/order/order-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, common],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) =>
    //     configService.get<object>('database'),
    //   inject: [ConfigService],
    // }),
    OrderServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class MainOrderServiceRootModule {}
