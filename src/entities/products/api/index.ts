import delay from "../../../shared/delay";
import data from "./data/mock.json";
import { isGetProductsResponse } from "./typeGuards";

async function getProducts() {
    const response = await delay(
        () => data
    )();
    if (!isGetProductsResponse(response)) {
        throw new Error("Wrong data from api");
    }
    return response;
}

export default {
    getProducts,
};
