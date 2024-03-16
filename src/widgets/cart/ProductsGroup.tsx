import { Group, Header, ScreenSpinner } from "@vkontakte/vkui";
import ProductCell from "../../entities/products/ui";
import { observer } from "mobx-react-lite";
import productsStore from "../../features/cart/model";
import CartActions from "../../features/cart/ui/CartActions";

const ProductsGroup = observer(() => {
    const store = productsStore;

    if (!store.products) {
        return <ScreenSpinner />;
    }

    return (
        <Group header={<Header mode="secondary">Товары</Header>}>
            {Array.from(store.products.keys()).map((id) => (
                <ProductCell key={id} id={id} after={<CartActions id={id} />} />
            ))}
        </Group>
    );
});

export default ProductsGroup;
