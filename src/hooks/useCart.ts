import { useContext } from "react";
import { Context } from "../app/StoreProvider";

function useCart() {
    const context = useContext(Context);
    if (!context) {
        throw new Error("StoreProvider is not specified");
    }
    return context.cart;
}

export default useCart;
