import * as Joi from 'joi';

export default Joi.object({
  MONGO_URI: Joi.string().required(),
  MONGO_DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.string().required(),
  REDIS_URL: Joi.string(),
  CACHE_TTL: Joi.string().required(),
  OPENAI_KEY: Joi.string().required()
});
