import { Injectable, CanActivate, ExecutionContext } from
'@nestjs/common';
@Injectable()
export class SessionGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean 
    {
        console.log("========= in session.guard.ts ===========");
        const request = context.switchToHttp().getRequest();
        return (request.session.email !== undefined); // undefined hole false return korbe 
    }
}
