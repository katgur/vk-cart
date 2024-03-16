import { observer } from "mobx-react-lite";
import queryInfoStore from "../model";
import { QueryStatus } from "../model/types";
import { ScreenSpinner } from "@vkontakte/vkui";

const ProgressInfo = observer(() => {
    const { queryStatus } = queryInfoStore;

    if (queryStatus === QueryStatus.FINISHED) {
        return;
    }

    return <ScreenSpinner />
})

export default ProgressInfo;