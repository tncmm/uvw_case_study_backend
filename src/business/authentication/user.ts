import { Status, User, } from '@prisma/client';
import { UserDbManager } from '../../database/user';
import { Token } from '../../domain/dtos/token';
import { BusinessError } from '../../domain/error/business_error';
import { NotFound } from '../../domain/error/not_found';
import { HashManager } from '../../helper/hash';
import { generateJwtToken } from '../../helper/jwt';

export interface UserRegisterParams {
  name: string;
  phone: string;
  surname: string;
  password: string;
  email: string;
}

export interface UserPhoneLoginParams {
  phone: string;
  password: string;
}
export interface UserEmailLoginParams {
  email: string;
  password: string;
}

export interface FetchUserDataParams {
  userId: string;
}

export interface UserUpdateParams {
  userId?: string;
  name?: string;
  surname?: string;
  phone: string;
  email?: string;
}

export default class UserManager {
  async loginWithEmail({ email, password }: UserEmailLoginParams): Promise<Object> {
    const user = await new UserDbManager().findByEmail({ email });

    if (!user) {
      throw new NotFound('user-not-found');
    }

    if (user.status === Status.PASSIVE) {
      throw new BusinessError('user-passive');
    }

    const valid = await new HashManager().isValid(password, user.password);

    if (!valid) {
      throw new BusinessError('invalid-password');
    }
    const token = await generateJwtToken({
      userId: user.id,
    });
    const data = {
      userId: user.id,
      email: user.email,
      phone: user.phoneNumber,
      name: user.name,
      surname: user.surname,
      token: token

    }
    return await data;
  }

  async register({
    name,
    surname,
    phone,
    password,
    email,
  }: UserRegisterParams): Promise<Object> {
    const user = await new UserDbManager().create({
      name,
      surname,
      phone,
      password,
      email,
    });
    const token = await generateJwtToken({
      userId: user.id,
    });
    const data = {
      userId: user.id,
      email: user.email,
      phone: user.phoneNumber,
      name: user.name,
      surname: user.surname,
      token: token

    }
    return await data;
  }


  async getUserData( userId : string): Promise<User | null> {
    const user = await new UserDbManager().findById(userId);
    return user
  }

  async update({ userId, name, surname, email, phone, }: UserUpdateParams): Promise<boolean> {

    await new UserDbManager().update({
      id: userId, name, surname, phone, email
    })
    return true
  }


}
