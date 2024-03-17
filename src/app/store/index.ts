import { CartStore } from "./cart";
import { QueryInfoStore } from "./error";

export class Store {
    cart: CartStore;
    queryInfo: QueryInfoStore;

    constructor() {
        this.queryInfo = new QueryInfoStore();
        this.cart = new CartStore(this);
    }
}
