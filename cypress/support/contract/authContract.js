import Joi from 'joi'

export const loginSuccessSchema = Joi.object({
  token: Joi.string().required()
}).required().unknown(false)

export default loginSuccessSchema
