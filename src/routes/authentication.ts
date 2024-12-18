import express, { Request, Response } from 'express';
import { requestValidator } from '../middleware/request_validator';
import {RegisterDTO,} from '../domain/dtos/authentication';
import { Token } from '../domain/dtos/token';
import UserAuthenticationManager from '../business/authentication/user';
import {
    EmailLoginSchema,
    RegisterSchema,} from '../domain/schemas/authentication';

const router: express.Router = express.Router();

router.post(
    '/register',
    requestValidator(RegisterSchema),
    async (req: Request, res: Response) => {
        let data: Object;

        data = await new UserAuthenticationManager().register(
            req.body as RegisterDTO
        );

        res.send({ data });
    }
);

router.post(
    '/login',
    requestValidator(EmailLoginSchema),
    async (req: Request, res: Response) => {
      const user = await new UserAuthenticationManager().loginWithEmail(req.body);
      
        console.log(user);
        
      res.send(user);
    }
  );
  




export default router;