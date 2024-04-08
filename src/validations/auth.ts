import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  email: Joi.string().required().messages({
    'string.base': `Email should be a type of string`,
    'string.empty': `Email cannot be an empty field`,
    'any.required': `Email is a required field`,
  }),
  password: Joi.string().required().messages({
    'string.base': `Password should be a type of string`,
    'string.empty': `Password cannot be an empty field`,
    'any.required': `Password is a required field`,
  }),
});
