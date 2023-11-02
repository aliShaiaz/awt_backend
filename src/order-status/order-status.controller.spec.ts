import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatusController } from './order-status.controller';
import { OrderStatusService } from './order-status.service';

describe('OrderStatusController', () => {
  let controller: OrderStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderStatusController],
      providers: [OrderStatusService],
    }).compile();

    controller = module.get<OrderStatusController>(OrderStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
