import { Injectable } from '@nestjs/common';
import { OrderEntity } from '@app/order-service/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderServiceService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) {}

  async create(data: Record<string, any>) {
    const { position_id, user_id, request_id } = data;

    const result = await this.orderRepo
      .createQueryBuilder()
      .insert()
      .into('orders')
      .values({
        position_id,
        user_id,
        request_id,
      })
      .returning('id')
      .execute();

    const { raw = [] } = result;
    const [response] = raw;

    return response;
  }

  list() {
    return this.orderRepo.createQueryBuilder().select(['*']).execute();
  }

  async retrieve(user_id, position_id, request_id: string) {
    const result = await this.orderRepo
      .createQueryBuilder()
      .select(['*'])
      .where('request_id like :id', { id: `%${request_id}%` })
      .execute();

    const [response = {}] = result;

    return response;
  }
}
