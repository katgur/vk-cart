import AppConfig from "./AppConfig";
import CartPage from "../pages/cart";
import ErrorInfo from "../shared/error/ui/ErrorInfo";
import ProgressInfo from "../shared/error/ui/ProgressInfo";

function App() {
    return (
        <AppConfig>
            <CartPage />
            <ErrorInfo />
            <ProgressInfo />
        </AppConfig>
    );
}

export default App;
