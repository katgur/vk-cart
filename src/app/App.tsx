import AppConfig from "./AppConfig";
import CartPage from "../pages/CartPage";
import ErrorInfo from "../components/ErrorInfo";
import ProgressInfo from "../components/ProgressInfo";
import { Store } from "./store";
import StoreProvider from "./StoreProvider";

const store = new Store();

function App() {
    return (
        <AppConfig>
            <StoreProvider store={store}>
                <CartPage />
                <ErrorInfo />
                <ProgressInfo />
            </StoreProvider>
        </AppConfig>
    );
}

export default App;
