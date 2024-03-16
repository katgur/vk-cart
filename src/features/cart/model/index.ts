import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import { Product } from "./types";

class CartStore {
    products: Map<number, Product>;
    MAX_PRODUCTS = 10;
    MIN_PRODUCTS = 1;

    constructor() {
        makeObservable(this, {
            products: observable,
            total: computed,
            addProduct: action,
            removeProduct: action,
            removeAllProducts: action,
        });
        this.products = new Map();
    }

    get total() {
        return Array.from(this.products.values()).reduce(
            (acc, product) => acc + product.price * product.count,
            0
        );
    }

    addProduct(id: number) {
        runInAction(() => {
            const product = this.products.get(id);
            if (!product || product.count === this.MAX_PRODUCTS) {
                return;
            }
            product.count++;
        });
    }

    removeProduct(id: number) {
        runInAction(() => {
            const product = this.products.get(id);
            if (!product || product.count === this.MIN_PRODUCTS) {
                return;
            }
            product.count--;
        });
    }

    removeAllProducts(id: number) {
        runInAction(() => {
            this.products.delete(id);
        });
    }
}

const cartStore = new CartStore();

export default cartStore;
