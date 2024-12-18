import { UserRole } from '@prisma/client';

export interface UserDTO {
  id: number;
  name: string;
  surname: string;
  role: UserRole;
}
export interface UserInfoDTO {
  userId: number;
}
export interface UserUpateDTO {
  phone: string;
  userId: string;
  name: string;
  surname: string;
  email: string;

}