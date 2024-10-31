const { Redis } = require("ioredis");
require("dotenv").config();

const redis = new Redis(process.env.REDIS_URI);

module.exports = redis;
