import { Button, Div, Group, Header, Text } from "@vkontakte/vkui";
import useCart from "../hooks/useCart";
import { observer } from "mobx-react-lite";

const CalculatorGroup = observer(() => {
    const cart = useCart();

    return (
        <Group header={<Header mode="secondary">Оплата</Header>}>
            <Div>
                <Text>{`Итого: ${Math.round(cart.total)} руб.`}</Text>
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
