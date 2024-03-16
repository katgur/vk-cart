import { Group, Header } from "@vkontakte/vkui";
import ProductCell from "../../entities/products/ui";
import { observer } from "mobx-react-lite";
import cartStore from "../../features/cart/model";
import CartActions from "../../features/cart/ui/CartActions";
import PaginationGroup from "../../shared/pagination/ui/PaginationGroup";

const ProductsGroup = observer(() => {
    const store = cartStore;

    return (
        <>
            <Group header={<Header mode="secondary">Товары</Header>}>
                {Array.from(store.current.keys()).map((id) => (
                    <ProductCell
                        key={id}
                        id={id}
                        after={<CartActions id={id} />}
                    />
                ))}
            </Group>
            <PaginationGroup pagination={store.pagination} />
        </>
    );
});

export default ProductsGroup;
