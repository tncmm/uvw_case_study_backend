import db from './db';
import { UserRole, Status } from '@prisma/client';
import { HashManager } from '../helper/hash';
import { BusinessError } from '../domain/error/business_error';

export interface UserCreationParams {
    name: string;
    surname: string;
    phone: string;
    password: string;
    email: string;
}

export interface UserUpdateParams {
    id?: string;
    name?: string;
    surname?: string;
    phone: string;
    email?: string;
    role?: UserRole;
}

export interface UserDestroyParams {
    id: string;
}

export interface UserFindByPhoneParams {
    phoneNumber: string;
}
export interface UserFindByEmailParams {
    email: string;
}

export interface UserFindByIdParams {
    id: string;
}

export class UserDbManager {
    create = async ({ name, surname, phone, password, email }: UserCreationParams) => {
        const user = await db.user.findFirst({
            where: {
                AND: {

                    phoneNumber: phone,
                },
                NOT: {
                    role: UserRole.ADMIN,
                },
            },
        });

        if (user) {
            if (
                user.phoneNumber === phone

            ) {
                throw new BusinessError('phone-in-use');
            }
        }

        return await db.user.create({
            data: {
                password: await new HashManager().hash(password),
                role: UserRole.USER,
                name: name,
                surname: surname,
                phoneNumber: phone,

                status: Status.ACTIVE,
                email: email
            },
            select: {
                id: true,
                name: true,
                surname: true,
                role: true,
                email:true,
                phoneNumber:true
            },
        });
    };

    update = async ({
        id,
        name,
        surname,
        phone,
        email,
    }: UserUpdateParams) => {
        return await db.user.update({
            where: { id: id },
            data: {
                name: name,
                surname: surname,
                phoneNumber: phone,
                email: email,
            },
            select: {
                id: true,
                name: true,
                surname: true,
                role: true,
            },
        });
    };

    destroy = async ({ id }: UserDestroyParams) => {
        return await db.user.update({
            where: {
                id: id,
            },
            data: {
                status: Status.PASSIVE,
            },
        });
    };

    findById = async (id:string) => {
        return await db.user.findUnique({
            where: {
                id: id,
            },
            //include: include,
        });
    };

    findByPhone = async ({ phoneNumber }: UserFindByPhoneParams) => {
        return await db.user.findFirst({
            where: {
                phoneNumber: phoneNumber,
                NOT: {
                    role: UserRole.INIT,
                },
            },
        });
    };
    findByEmail = async ({ email }: UserFindByEmailParams) => {
        return await db.user.findFirst({
            where: {
                email: email,
            },
            //include: include,
        });
    };
}
