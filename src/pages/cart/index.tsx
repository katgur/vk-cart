import { Panel, PanelHeader, SplitLayout, SplitCol } from "@vkontakte/vkui";
import ProductsGroup from "../../widgets/cart/ProductsGroup";
import CalculatorGroup from "../../widgets/cart/CalculatorGroup";
import { useEffect } from "react";
import cartStore from "../../features/cart/model";

function CartPage() {
    const products = cartStore;

    useEffect(() => {
        products.fetch();
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
