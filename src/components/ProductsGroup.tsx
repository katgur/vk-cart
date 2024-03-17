import { Group, Header } from "@vkontakte/vkui";
import CartActions from "./CartActions";
import PaginationGroup from "./PaginationGroup";
import ProductCell from "./ProductCell";
import useCart from "../hooks/useCart";
import { observer } from "mobx-react-lite";

const ProductsGroup = observer(() => {
    const cart = useCart();

    return (
        <>
            <Group header={<Header mode="secondary">Товары</Header>}>
                {Array.from(cart.current.entries()).map(([id]) => (
                    <ProductCell
                        key={id}
                        id={id}
                        after={<CartActions id={id} />}
                    />
                ))}
            </Group>
            <PaginationGroup pagination={cart.pagination} />
        </>
    );
});

export default ProductsGroup;
