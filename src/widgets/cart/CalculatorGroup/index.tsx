import { Button, Div, Group, Header, Text } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import cartStore from "../../../features/cart/model";

const CalculatorGroup = observer(() => {
    const cart = cartStore;

    return (
        <Group header={<Header mode="secondary">Оплата</Header>}>
            <Div>
                <Text>{`Итого: ${cart.total.toFixed(2)} руб.`}</Text>
            </Div>
            <Div>
                <Button size="l" disabled>
                    Перейти к оплате
                </Button>
            </Div>
        </Group>
    );
});

export default CalculatorGroup;
