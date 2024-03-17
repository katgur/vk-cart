import {
    action,
    autorun,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import api from "../../api";
import { Product } from "../../types/product";
import { QueryStatus } from "../../types/query-info";
import { Store } from ".";
import { PaginationStore } from "./pagination";

export class CartStore {
    MAX_PRODUCTS = 10;
    MIN_PRODUCTS = 1;
    products: Map<number, Product>;
    current: Map<number, Product>;
    store: Store;
    pagination: PaginationStore;

    constructor(store: Store) {
        makeObservable(this, {
            products: observable,
            total: computed,
            fetch: action,
            addProduct: action,
            removeProduct: action,
            removeAllProducts: action,
            current: observable,
            applyPagination: action,
            resetPagination: action,
        });
        this.products = new Map();
        this.current = new Map();
        this.store = store;
        this.pagination = new PaginationStore(5);
        autorun(() => {
            this.pagination.setTotal(this.products.size);
            this.resetPagination();
        });
        autorun(() => {
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
        this.store.queryInfo.setQueryStatus(QueryStatus.PENDING);
        api.getProducts()
            .then((response) => {
                runInAction(() => {
                    this.products = new Map(
                        response.map((product) => [product.id, product])
                    );
                });
            })
            .catch((error) => {
                this.store.queryInfo.setError({
                    message: error.message,
                    tryAgain: () => {
                        this.store.queryInfo.resetError();
                        this.fetch();
                    },
                });
            })
            .finally(() => {
                this.store.queryInfo.setQueryStatus(QueryStatus.FINISHED);
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

    resetPagination() {
        runInAction(() => {
            this.current = new Map(
                Array.from(this.products.entries()).slice(
                    this.pagination.skip,
                    this.pagination.skip + this.pagination.limit
                )
            );
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
