import {
    Icon16AddCircleOutline,
    Icon16MinusCircleOutline,
    Icon16DeleteOutline,
} from "@vkontakte/icons";
import { IconButton, ButtonGroup } from "@vkontakte/vkui";
import productsStore from "../model";
import { observer } from "mobx-react-lite";

interface CartActionsProps {
    id: number;
}

const CartActions = observer(({ id }: CartActionsProps) => {
    const store = productsStore;
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
                <Icon16AddCircleOutline color="#4287f5" />
            </IconButton>
            <IconButton
                label="Убрать один товар из корзины"
                onClick={() => store.removeProduct(id)}
                disabled={count === store.MIN_PRODUCTS}
            >
                <Icon16MinusCircleOutline color="#4287f5" />
            </IconButton>
            <IconButton
                label="Удалить весь товар из корзины"
                onClick={() => store.removeAllProducts(id)}
            >
                <Icon16DeleteOutline />
            </IconButton>
        </ButtonGroup>
    );
});

export default CartActions;
