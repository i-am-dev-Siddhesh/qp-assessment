import Joi from 'joi';

export const addGroceryItemValidation = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': `Name should be a type of string`,
    'string.empty': `Name cannot be an empty field`,
    'any.required': `Name is a required field`,
  }),
  price: Joi.number().required().messages({
    'number.base': `Price should be a type of number`,
    'number.empty': `Price cannot be an empty field`,
    'any.required': `Price is a required field`,
  }),
  inventory: Joi.number().integer().required().messages({
    'number.base': `Inventory should be a type of integer`,
    'number.empty': `Inventory cannot be an empty field`,
    'number.integer': `Inventory should be an integer`,
    'any.required': `Inventory is a required field`,
  }),
});

export const updateGroceryItemValidation = Joi.object().keys({
  name: Joi.string().messages({
    'string.base': `Name should be a type of string`,
    'string.empty': `Name cannot be an empty field`,
  }),
  price: Joi.number().messages({
    'number.base': `Price should be a type of number`,
    'number.empty': `Price cannot be an empty field`,
  }),
  inventory: Joi.number().integer().messages({
    'number.base': `Inventory should be a type of integer`,
    'number.empty': `Inventory cannot be an empty field`,
    'number.integer': `Inventory should be an integer`,
  }),
});
