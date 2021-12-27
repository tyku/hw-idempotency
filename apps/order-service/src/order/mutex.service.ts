import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MutexEntity } from '@app/order-service/entities/mutex.entity';

@Injectable()
export class MutexService {
  constructor(
    @InjectRepository(MutexEntity)
    private readonly mutexRepo: Repository<MutexEntity>,
  ) {}

  async create(data: Record<string, any>) {
    const { request_id } = data;

    const result = await this.mutexRepo
      .createQueryBuilder()
      .insert()
      .into('mutexes')
      .values({
        request_id,
      })
      .returning('id')
      .execute();

    const { raw = [] } = result;
    const [response] = raw;

    return response;
  }

  list() {
    return this.mutexRepo.createQueryBuilder().select(['*']).execute();
  }
}
