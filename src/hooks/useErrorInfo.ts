import { useContext } from "react";
import { Context } from "../app/StoreProvider";

function useErrorInfo() {
    const context = useContext(Context);
    if (!context) {
        throw new Error("StoreProvider is not specified");
    }
    return context.queryInfo.errorInfo;
}

export default useErrorInfo;
