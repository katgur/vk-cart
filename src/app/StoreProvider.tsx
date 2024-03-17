import { ReactNode, createContext } from "react";
import { Store } from "./store";

export const Context = createContext<Store | null>(null);

interface StoreProviderProps {
    children: ReactNode;
    store: Store;
}

function StoreProvider({ children, store }: StoreProviderProps) {
    return <Context.Provider value={store}>{children}</Context.Provider>;
}

export default StoreProvider;
