import {
    action,
    autorun,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import api from "../../../entities/products/api";
import { Product } from "../../../entities/products/model";
import queryInfoStore from "../../../shared/error/model";
import { QueryStatus } from "../../../shared/error/model/types";
import { PaginationStore } from "../../../shared/pagination/model";

class CartStore {
    MAX_PRODUCTS = 10;
    MIN_PRODUCTS = 1;
    products: Map<number, Product>;
    current: Map<number, Product>;
    pagination: PaginationStore;

    constructor() {
        makeObservable(this, {
            products: observable,
            total: computed,
            fetch: action,
            addProduct: action,
            removeProduct: action,
            removeAllProducts: action,
            current: observable,
            applyPagination: action,
        });
        this.products = new Map();
        this.current = new Map();
        this.pagination = new PaginationStore(5);
        autorun(() => {
            this.pagination.setTotal(this.products.size);
            this.applyPagination(this.pagination.skip, this.pagination.limit);
        });
    }

    get total() {
        return Array.from(this.products.values()).reduce(
            (acc, product) => acc + product.price * product.count,
            0
        );
    }

    fetch() {
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
                        this.fetch();
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

    applyPagination(skip: number, limit: number) {
        runInAction(() => {
            this.current = new Map(
                Array.from(this.products.entries()).slice(skip, skip + limit)
            );
        });
    }
}

const cartStore = new CartStore();

export default cartStore;
