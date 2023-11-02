import { Test, TestingModule } from '@nestjs/testing';
import { OrderTrackingService } from './order-tracking.service';

describe('OrderTrackingService', () => {
  let service: OrderTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTrackingService],
    }).compile();

    service = module.get<OrderTrackingService>(OrderTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
