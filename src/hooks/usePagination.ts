import { useContext } from "react";
import { Context } from "../app/StoreProvider";

function usePagination() {
    const context = useContext(Context);
    if (!context) {
        throw new Error("StoreProvider is not specified");
    }
    return context.pagination;
}

export default usePagination;
