import Joi from 'joi';

export const GetUserDataSchema = Joi.object({
    email:Joi.number()
});

export const UpdateUserSchema=Joi.object({
    userId:Joi.number(),
    phone: Joi.string().length(12).required(),
    name: Joi.string().max(50).min(2).required(),
    surname: Joi.string().max(50).min(2).required(),
    email:Joi.string()
})