const express = require("express");
const redis = require("ioredis");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { getProducts, getProductById } = require("./api/product");
const redisClient = require("./redis/config");

dotenv.config();

PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/products", async (req, res) => {
    // check if products is exist in redis then return the products via redis
    let productsData = await redisClient.get("products");
    if (productsData) {
        console.log("Fetching products from Redis".bgYellow);
        return res.json(JSON.parse(productsData));
    }

    const products = await getProducts();
    // Store just the products data in Redis
    await redisClient.set("products", JSON.stringify(products));
    res.json(products);
});

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    // check if product is exist in redis then return the product via redis
    let productData = await redisClient.get(`product:${id}`);

    if (productData) {
        console.log("Fetching product from Redis".bgYellow);
        return res.json(JSON.parse(productData));
    }

    const product = await getProductById(id);
    // Store the product data in Redis
    await redisClient.set(`product:${id}`, JSON.stringify(product));
    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgGreen.black);
});





