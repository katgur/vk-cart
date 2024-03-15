import { isNumber, isString, isArray } from "../../../shared";
import { GetProductsResponse, Product, Rating } from "./types";

function isRating(unknownType: unknown): unknownType is Rating {
    const rating = unknownType as Rating;
    return isNumber(rating.count) && isNumber(rating.rate);
}

function isProduct(unknownType: unknown): unknownType is Product {
    const product = unknownType as Product;
    return (
        isNumber(product.id) &&
        isString(product.title) &&
        isNumber(product.price) &&
        isString(product.description) &&
        isString(product.category) &&
        isString(product.image) &&
        isRating(product.rating)
    );
}

export function isGetProductsResponse(
    unknownType: unknown
): unknownType is GetProductsResponse {
    const response = unknownType as GetProductsResponse;
    return isArray(response) && response.every(isProduct);
}
