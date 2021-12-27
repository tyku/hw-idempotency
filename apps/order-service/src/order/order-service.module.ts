import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@app/order-service/entities/order.entity';
import { MutexEntity } from '@app/order-service/entities/mutex.entity';

import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { MutexService } from './mutex.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, MutexEntity])],
  controllers: [OrderServiceController],
  providers: [OrderServiceService, MutexService],
})
export class OrderServiceModule {}
