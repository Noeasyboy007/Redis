const express = require("express");
const redis = require("ioredis");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { getProducts } = require("./api/product");
const redisClient = require("./redis/config");

dotenv.config();

PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
    // check if products is exist in redis then return the products via redis
    const isExist = await redisClient.exists("products");
    if (isExist) {
        console.log("Fetching products from Redis".bgYellow);
        const products = await redisClient.get("products");
        return res.json({
            products: JSON.parse(products)
        })
    }

    const products = await getProducts();
    // Either set the products to redis and  return the products
    await redisClient.set("products", JSON.stringify(products));
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgGreen.black);
});





