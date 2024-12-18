import { UserRole } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { Forbidden } from '../domain/error/forbidden';
import { Unauthorized } from '../domain/error/unauthorized';
import { verifyJwtToken } from '../helper/jwt';

export function authorize(allowedRoles?: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user?.userId || user.userId =="") {
      throw new Unauthorized('user-not-found');
    }

    // Check if the user's role is allowed
    if (
      allowedRoles &&
      allowedRoles.length > 0 &&
      (!user.role || !allowedRoles.includes(user.role))
    ) {
      throw new Forbidden('user-role-not-allowed');
    }

    next();
  };
}



