import { isNumber, isString, isArray } from "../../../shared";
import { GetProductsResponse, Product } from "./types";

function isProduct(unknownType: unknown): unknownType is Product {
    const product = unknownType as Product;
    return (
        isNumber(product.id) &&
        isString(product.title) &&
        isNumber(product.price) &&
        isString(product.description) &&
        isNumber(product.count) &&
        isString(product.thumbnail)
    );
}

export function isGetProductsResponse(
    unknownType: unknown
): unknownType is GetProductsResponse {
    const response = unknownType as GetProductsResponse;
    return isArray(response) && response.every(isProduct);
}
