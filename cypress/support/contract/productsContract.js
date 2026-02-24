import Joi from 'joi'

export const productItemSchema = Joi.object({
  id: Joi.number().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().required(),
  price: Joi.number().required(),
  title: Joi.string().required(),
  rating: Joi.object({
    count: Joi.number().required(),
    rate: Joi.number().required(),
  }).required()
}).required().unknown(false)

export const productListSchema = Joi.array().items(productItemSchema).required()

export default productListSchema
