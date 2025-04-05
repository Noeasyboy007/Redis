const getProducts = () =>
    new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({
                products: [
                    {
                        id: 1,
                        name: "Product 1",
                        price: 100
                    }
                ]
            })
        }, 4000)
    })

const getProductById = (id) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                product: {
                    id: id,
                    name: "Product " + id,
                    price: Math.random() * 1000
                }
            })
        }, 4000)
    })
module.exports = { getProducts, getProductById };