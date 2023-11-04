import { PartialType } from '@nestjs/mapped-types';
import { ManagerSignUpDto } from './manager-signup.dto';

export class UpdateManagerDto extends PartialType(ManagerSignUpDto) {}
