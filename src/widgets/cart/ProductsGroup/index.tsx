import { Group, Header, ScreenSpinner } from "@vkontakte/vkui";
import ProductCell from "../../../entities/products/ui";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import cartStore from "../../../features/cart/model";
import productsStore from "../../../entities/products/model";
import { autorun, runInAction } from "mobx";
import CartActions from "../../../features/cart/ui/CartActions";

const ProductsGroup = observer(() => {
    const cart = cartStore;
    const products = productsStore;

    useEffect(() => {
        products.fetchAll();
    }, [products]);

    useEffect(() => {
        autorun(() => {
            runInAction(() => {
                cart.products = new Map(
                    products.all?.map((product) => [
                        product.id,
                        {
                            price: product.price,
                            count: Math.floor(Math.random() * 10) + 1,
                        },
                    ]) || []
                );
            });
        });
    }, [cart, products.all]);

    if (!products.all) {
        return <ScreenSpinner />;
    }

    return (
        <Group header={<Header mode="secondary">Товары</Header>}>
            {Array.from(cart.products.keys()).map((id) => (
                <ProductCell key={id} id={id} after={<CartActions id={id} />} />
            ))}
        </Group>
    );
});

export default ProductsGroup;
