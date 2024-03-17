import { Icon16DeleteOutline, Icon16Add, Icon16Minus } from "@vkontakte/icons";
import { IconButton, ButtonGroup } from "@vkontakte/vkui";
import useCart from "../hooks/useCart";
import { observer } from "mobx-react-lite";

interface CartActionsProps {
    id: number;
}

const CartActions = observer(({ id }: CartActionsProps) => {
    const cart = useCart();
    const count = cart.products.get(id)?.count;

    if (!count) {
        return;
    }

    return (
        <ButtonGroup>
            <IconButton
                label="Добавить один товар в корзину"
                onClick={() => cart.addProduct(id)}
                disabled={count === cart.MAX_PRODUCTS}
            >
                <Icon16Add color="#4287f5" />
            </IconButton>
            <IconButton
                label="Убрать один товар из корзины"
                onClick={() => cart.removeProduct(id)}
                disabled={count === cart.MIN_PRODUCTS}
            >
                <Icon16Minus color="#4287f5" />
            </IconButton>
            <IconButton
                label="Удалить весь товар из корзины"
                onClick={() => cart.removeAllProducts(id)}
            >
                <Icon16DeleteOutline color="red" />
            </IconButton>
        </ButtonGroup>
    );
});

export default CartActions;
