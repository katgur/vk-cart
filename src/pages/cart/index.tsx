import { Panel, PanelHeader, SplitLayout, SplitCol } from "@vkontakte/vkui";
import ProductsGroup from "../../widgets/cart/ProductsGroup";
import CalculatorGroup from "../../widgets/cart/CalculatorGroup";
import { useEffect } from "react";
import productsStore from "../../features/cart/model";

function CartPage() {
    const products = productsStore;

    useEffect(() => {
        products.fetchAll();
    }, [products]);

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
