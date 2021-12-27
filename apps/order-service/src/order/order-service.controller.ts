import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MakeOrderDto } from '@app/order-service/dto';

import { OrderServiceService } from './order-service.service';
import { MutexService } from '@app/order-service/order/mutex.service';

@Controller('/v1/order')
export class OrderServiceController {
  constructor(
    private readonly orderServiceService: OrderServiceService,
    private readonly mutexService: MutexService,
  ) {}

  @Get()
  list() {
    return this.orderServiceService.list();
  }

  @Get(':id')
  retrieve(@Param('id') id: string) {
    return this.orderServiceService.retrieve(id);
  }

  @Post('make')
  async makeOrder(@Body() data: MakeOrderDto, @Req() req: Request) {
    const { position_id, user_id } = data;
    const headers = req.headers;
    const requestId = headers['x-request-id'];

    if (!requestId) {
      throw new Error('Missing request id');
    }

    await this.mutexService.create({ request_id: requestId });
    await this.orderServiceService.create({ position_id, user_id });

    return { text: 'Заявка создана' };
  }
}
