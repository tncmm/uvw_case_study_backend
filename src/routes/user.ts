import express, { Request, Response } from 'express';
import { requestValidator } from '../middleware/request_validator';
import { GetUserDataSchema, UpdateUserSchema } from '../domain/schemas/user';
import UserManager from '../business/authentication/user';
import {  authorize } from '../middleware/authorize';
import { UserRole } from '@prisma/client';
import { UserUpateDTO } from '../domain/dtos/user';

const router: express.Router = express.Router();


router.get(
    '/:id',
    requestValidator(GetUserDataSchema),
    authorize([UserRole.USER]),
    async (req: Request, res: Response) => {
        const userId =req.params.id
       const user = await new UserManager().getUserData(
            userId
        );
        res.send(user);
    }
);




router.post(
    '/update',
    requestValidator(UpdateUserSchema),
    authorize([UserRole.USER]),
    async (req: Request, res: Response) => {
        console.log(req.body)
      const data = await new UserManager().update(
        req.body as UserUpateDTO
    );
      res.send(data);
    }
  );
export default router;