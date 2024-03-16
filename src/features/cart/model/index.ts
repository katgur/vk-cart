import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import api from "../../../entities/products/api";
import { Product } from "../../../entities/products/model";

class CartStore {
    products: Map<number, Product>;
    setError: (error: string) => void;
    MAX_PRODUCTS = 10;
    MIN_PRODUCTS = 1;

    constructor(setError: (error: string) => void) {
        makeObservable(this, {
            products: observable,
            total: computed,
            addProduct: action,
            removeProduct: action,
            removeAllProducts: action,
        });
        this.products = new Map();
        this.setError = setError;
    }

    get total() {
        return Array.from(this.products.values()).reduce(
            (acc, product) => acc + product.price * product.count,
            0
        );
    }

    fetchAll() {
        api.getProducts()
            .then((response) => {
                runInAction(() => {
                    this.products = new Map(
                        response.map((product) => [product.id, product])
                    );
                });
            })
            .catch((error) => {
                this.setError(error.message);
            });
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

const productsStore = new CartStore(console.error);

export default productsStore;
