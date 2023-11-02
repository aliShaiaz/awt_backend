import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";



@Injectable()
export class CurrentBuyerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        if (req.session && req.session.buyer) {
            // User is logged in, proceed to the next middleware or route handler
            next();
          } else {
            // User is not logged in, return an unauthorized response
            res.status(401).json({ message: 'Unauthorized' });
          }
    }
}