import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import api from "../../../entities/products/api";
import { Product } from "../../../entities/products/model";
import queryInfoStore from "../../../shared/error/model";
import { QueryStatus } from "../../../shared/error/model/types";

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

    fetchAll() {
        queryInfoStore.setQueryStatus(QueryStatus.PENDING);
        api.getProducts()
            .then((response) => {
                runInAction(() => {
                    this.products = new Map(
                        response.map((product) => [product.id, product])
                    );
                });
            })
            .catch((error) => {
                queryInfoStore.setError({
                    message: error.message,
                    tryAgain: () => {
                        queryInfoStore.resetError();
                        this.fetchAll();
                    },
                });
            })
            .finally(() => {
                queryInfoStore.setQueryStatus(QueryStatus.FINISHED);
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

const productsStore = new CartStore();

export default productsStore;
