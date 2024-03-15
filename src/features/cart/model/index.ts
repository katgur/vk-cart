import { action, makeObservable, observable, runInAction } from "mobx";
import { ProductsStore } from "../../../entities/products/model";

export class CartStore {
    products: ProductsStore;
    counts: Map<number, number>;

    constructor() {
        makeObservable(this, {
            products: observable,
            addProduct: action,
            removeProduct: action,
            removeAllProducts: action,
        });
        this.products = new ProductsStore(console.error);
        this.counts = new Map();
    }

    calculateSum() {
        if (!this.products.all) {
            return null;
        }
        return this.products.all.reduce(
            (acc, product) =>
                acc + product.price * (this.counts.get(product.id) || 0),
            0
        );
    }

    addProduct(id: number) {
        runInAction(() => {
            this.counts.set(id, (this.counts.get(id) || 0) + 1);
        });
    }

    removeProduct(id: number) {
        runInAction(() => {
            const count = this.counts.get(id);
            if (!count) {
                return;
            }
            if (count === 1) {
                this.counts.delete(id);
                return;
            }
            this.counts.set(id, count - 1);
        });
    }

    removeAllProducts(id: number) {
        runInAction(() => {
            this.counts.delete(id);
        });
    }
}
