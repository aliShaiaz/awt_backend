import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";



@Injectable()
export class CurrentManagerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        if (req.session && req.session.manager) {
            // User is logged in, proceed to the next middleware or route handler
            next();
          } else {
            // User is not logged in, return an unauthorized response
            res.status(401).json({ message: 'Unauthorized' });
          }
    }
}