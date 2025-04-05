const Redis = require("ioredis");

const redisClient = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
});

redisClient.on("error", (err) => {
    console.error("Redis Error:".bgRed.white, err.message);
});

redisClient.on("connect", () => {
    console.log("Redis Connected".bgMagenta);
});

module.exports = redisClient;