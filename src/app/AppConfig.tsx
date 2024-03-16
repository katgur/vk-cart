import { ConfigProvider, AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import { ReactNode } from "react";
import "@vkontakte/vkui/dist/vkui.css";

interface AppConfigProps {
    children: ReactNode;
}

function AppConfig({ children }: AppConfigProps) {
    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>{children}</AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default AppConfig;
