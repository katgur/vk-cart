import delay from "../../../shared/delay";
import data from "./data/mock.json";
import { isGetProductsResponse } from "./typeGuards";

async function getProducts() {
    const response = await delay(() => {
        const rnd = Math.random();
        if (rnd < 1 / 10) {
            throw new Error("Internal Server Error");
        }
        return data;
    })();
    if (!isGetProductsResponse(response)) {
        throw new Error("Wrong data from api");
    }
    return response;
}

export default {
    getProducts,
};
