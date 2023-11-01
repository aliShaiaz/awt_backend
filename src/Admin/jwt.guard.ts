
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

declare module 'express' {
    interface Request {
      user?: any; // Define the user property
    }
  }

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['token']; // Extract token from cookies

    if (!token) {
      throw new UnauthorizedException("Login required");
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // Attach user data to the request
      return true;
    } catch (error) {
      return false;
    }
  }
}
