import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderTrackingDto } from './create-order-tracking.dto';

export class UpdateOrderTrackingDto extends PartialType(CreateOrderTrackingDto) {}
