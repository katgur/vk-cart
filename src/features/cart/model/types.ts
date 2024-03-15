import { Product } from "../../../entities/products/model/types";

export type CartProduct = Product & { count: number };
