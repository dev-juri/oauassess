import * as Joi from 'joi';

export default Joi.object({
  MONGO_URI: Joi.string().required(),
  MONGO_DB_NAME: Joi.string().required(),
});
