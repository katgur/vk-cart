import { Panel, PanelHeader, SplitLayout, SplitCol } from "@vkontakte/vkui";
import ProductsGroup from "../../widgets/cart/ProductsGroup";
import CalculatorGroup from "../../widgets/cart/CalculatorGroup";

function CartPage() {
    return (
        <Panel>
            <PanelHeader>Корзина</PanelHeader>
            <SplitLayout className="center">
                <SplitCol maxWidth="75%" autoSpaced>
                    <ProductsGroup />
                </SplitCol>
                <SplitCol maxWidth="25%" autoSpaced>
                    <CalculatorGroup />
                </SplitCol>
            </SplitLayout>
        </Panel>
    );
}

export default CartPage;
