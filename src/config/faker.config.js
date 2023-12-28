import { faker } from "@faker-js/faker"

//Funcion para generar usuarios falsos
faker.location = "es"

export const createFakeProducts = () => {
    const products = []
    for (let i = 0; i < 100; i++) {
        products.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            category: faker.commerce.department(),
            stock: faker.finance.amount({ min: 1000, max: 10000, dec: 2, symbol: '$' }),
            thumbnail: faker.image.url()
        })
    }
    return products
}