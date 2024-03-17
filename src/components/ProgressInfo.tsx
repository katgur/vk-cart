import { observer } from "mobx-react-lite";
import useQueryStatus from "../hooks/useQueryStatus";
import { QueryStatus } from "../types/query-info";
import { ScreenSpinner } from "@vkontakte/vkui";

const ProgressInfo = observer(() => {
    const queryStatus = useQueryStatus();

    if (queryStatus === QueryStatus.FINISHED) {
        return;
    }

    return <ScreenSpinner />;
});

export default ProgressInfo;
