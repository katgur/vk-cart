import {
    Icon16AddCircleOutline,
    Icon16MinusCircleOutline,
    Icon16DeleteOutline,
} from "@vkontakte/icons";
import { IconButton, ButtonGroup, Div } from "@vkontakte/vkui";
import cartStore from "../model";
import { observer } from "mobx-react-lite";

interface CartActionsProps {
    id: number;
}

const CartActions = observer(({ id }: CartActionsProps) => {
    const cart = cartStore;
    const count = cart.products.get(id)?.count || 0;

    return (
        <ButtonGroup>
            <IconButton
                label="Добавить один товар в корзину"
                onClick={() => cart.addProduct(id)}
                disabled={count === cart.MAX_PRODUCTS}
            >
                <Icon16AddCircleOutline color="#4287f5" />
            </IconButton>
            <Div>{count}</Div>
            <IconButton
                label="Убрать один товар из корзины"
                onClick={() => cart.removeProduct(id)}
                disabled={count === cart.MIN_PRODUCTS}
            >
                <Icon16MinusCircleOutline color="#4287f5" />
            </IconButton>
            <IconButton
                label="Удалить весь товар из корзины"
                onClick={() => cart.removeAllProducts(id)}
            >
                <Icon16DeleteOutline />
            </IconButton>
        </ButtonGroup>
    );
});

export default CartActions;
