import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MakeOrderDto } from '@app/order-service/dto';

import { OrderServiceService } from './order-service.service';

@Controller('/v1/order')
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {
  }

  @Get()
  list() {
    return this.orderServiceService.list();
  }

  @Post('make')
  async makeOrder(@Body() data: MakeOrderDto, @Req() req: Request) {
    const { position_id, user_id } = data;

    const headers = req.headers;
    const request_id = headers['request-id'];

    if (!request_id) {
      throw new Error('Missing request id');
    }

    try {
      const { id: orderId } = await this.orderServiceService.create({
        position_id,
        user_id,
        request_id,
      });

      return { text: 'Заявка создана', orderId };
    } catch (e) {
      const { id } = await this.orderServiceService.retrieve(
        user_id,
        position_id,
        request_id,
      );

      return { text: 'Заявка создана', orderId: id };
    }
  }
}
