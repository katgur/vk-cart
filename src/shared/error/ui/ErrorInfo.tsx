import { Icon24ErrorCircleFillRed } from "@vkontakte/icons";
import { Alert, SimpleCell, Title } from "@vkontakte/vkui";
import queryInfoStore from "../model";
import { observer } from "mobx-react-lite";

const ErrorInfo = observer(() => {
    const { errorInfo } = queryInfoStore;

    if (!errorInfo) {
        return;
    }

    return (
        <Alert
            actions={[
                {
                    title: "Попробовать снова",
                    mode: "default",
                },
            ]}
            actionsAlign="right"
            actionsLayout="horizontal"
            header={
                <SimpleCell before={<Icon24ErrorCircleFillRed />}>
                    <Title>Произошла ошибка</Title>
                </SimpleCell>
            }
            onClose={errorInfo.tryAgain}
            text={errorInfo.message}
        />
    );
});

export default ErrorInfo;
