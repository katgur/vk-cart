import { useContext } from "react";
import { Context } from "../app/StoreProvider";

function useQueryStatus() {
    const context = useContext(Context);
    if (!context) {
        throw new Error("StoreProvider is not specified");
    }
    return context.queryInfo.queryStatus;
}

export default useQueryStatus;
