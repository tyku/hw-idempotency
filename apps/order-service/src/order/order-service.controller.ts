import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MakeOrderDto, CreateOrderDto } from '@app/order-service/dto';

import { OrderServiceService } from './order-service.service';

@Controller('/v1/order')
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Get()
  list() {
    return this.orderServiceService.list();
  }

  @Get(':id')
  retrieve(@Param('id') id: string) {
    return this.orderServiceService.retrieve(id);
  }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderServiceService.create(data);
  }

  @Post('make')
  async makeOrder(@Body() data: MakeOrderDto) {
    const { order_id } = data;
    await this.orderServiceService.retrieve(order_id);

    return { text: 'Заявка создана' };
  }
}
