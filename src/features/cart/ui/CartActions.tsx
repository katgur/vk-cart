import { Icon16DeleteOutline, Icon16Add, Icon16Minus } from "@vkontakte/icons";
import { IconButton, ButtonGroup } from "@vkontakte/vkui";
import cartStore from "../model";
import { observer } from "mobx-react-lite";

interface CartActionsProps {
    id: number;
}

const CartActions = observer(({ id }: CartActionsProps) => {
    const store = cartStore;
    const count = store.products.get(id)?.count;

    if (!count) {
        return;
    }

    return (
        <ButtonGroup>
            <IconButton
                label="Добавить один товар в корзину"
                onClick={() => store.addProduct(id)}
                disabled={count === store.MAX_PRODUCTS}
            >
                <Icon16Add color="#4287f5" />
            </IconButton>
            <IconButton
                label="Убрать один товар из корзины"
                onClick={() => store.removeProduct(id)}
                disabled={count === store.MIN_PRODUCTS}
            >
                <Icon16Minus color="#4287f5" />
            </IconButton>
            <IconButton
                label="Удалить весь товар из корзины"
                onClick={() => store.removeAllProducts(id)}
            >
                <Icon16DeleteOutline color="red" />
            </IconButton>
        </ButtonGroup>
    );
});

export default CartActions;
