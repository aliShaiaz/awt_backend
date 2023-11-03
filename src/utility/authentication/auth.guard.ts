import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.session || !request.session.buyer) {
      throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
