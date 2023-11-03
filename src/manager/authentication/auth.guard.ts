import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.session || !request.session.manager) {
      // throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      throw new HttpException('Unauthorized', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}