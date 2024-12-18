import { UserRole } from '@prisma/client';

export interface UserTokenPayload {
  userId: string;
  role: UserRole;
  name: string;
  surname: string;
}

export type Token = string;
