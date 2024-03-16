import { makeObservable, observable, runInAction } from "mobx";
import api from "../api";
import { Product } from "./types";

class ProductsStore {
    all: Product[] | null;
    setError: (error: string) => void;

    constructor(setError: (error: string) => void) {
        makeObservable(this, {
            all: observable,
        });
        this.all = null;
        this.setError = setError;
    }

    fetchAll() {
        api.getProducts()
            .then((response) => {
                runInAction(() => {
                    this.all = response;
                });
            })
            .catch((error) => {
                this.setError(error.message);
            });
    }
}

const productsStore = new ProductsStore(console.error);

export default productsStore;
