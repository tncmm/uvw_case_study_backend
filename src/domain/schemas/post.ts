import Joi from 'joi';

export const CreatePostSchema = Joi.object({
  title: Joi.string().max(100).required(),
  content: Joi.string().min(20).required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

export const UpdatePostSchema = Joi.object({
  title: Joi.string().max(100).optional(),
  content: Joi.string().min(20).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});
