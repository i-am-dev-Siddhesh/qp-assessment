import Joi from 'joi';

export const bookGroceryItemValidation = Joi.array().items(
  Joi.object().keys({
    groceryItemId: Joi.number().required().messages({
      'number.base': `Grocery Id should be a type of number`,
      'number.empty': `Grocery Id cannot be an empty field`,
      'any.required': `Grocery Id is a required field`,
    }),
    quantity: Joi.number().required().messages({
      'number.base': `Price should be a type of number`,
      'number.empty': `Price cannot be an empty field`,
      'any.required': `Price is a required field`,
    }),
  })
);
