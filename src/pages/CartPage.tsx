import { Panel, PanelHeader, SplitLayout, SplitCol } from "@vkontakte/vkui";
import ProductsGroup from "../components/ProductsGroup";
import CalculatorGroup from "../components/CalculatorGroup";
import { useEffect } from "react";
import useCart from "../hooks/useCart";

function CartPage() {
    const cart = useCart();

    useEffect(() => {
        cart.fetch();
    }, [cart]);

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
