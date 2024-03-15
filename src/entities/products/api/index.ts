import { isGetProductsResponse } from "./typeGuards";

const url = "https://fakestoreapi.com/products";

async function getProducts() {
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    if (!isGetProductsResponse(json)) {
        throw new Error("Wrong data from api");
    }
    return json;
}

export default {
    getProducts,
};
