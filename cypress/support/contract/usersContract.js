import Joi from 'joi'

export const userSchema = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  }).required(),
  address: Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().required(),
    zipcode: Joi.string().required(),
    geolocation: Joi.object({
      lat: Joi.string().required(),
      long: Joi.string().required(),
    }).required()
  }).required(),
  phone: Joi.string().required(),
  __v: Joi.number().optional()
}).required().unknown(false)

export default userSchema
