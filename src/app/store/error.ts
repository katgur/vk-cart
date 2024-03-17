import { action, makeObservable, observable, runInAction } from "mobx";
import { ErrorInfo, QueryStatus } from "../../types/query-info";

export class QueryInfoStore {
    errorInfo: ErrorInfo | null;
    queryStatus: QueryStatus;

    constructor() {
        makeObservable(this, {
            errorInfo: observable,
            queryStatus: observable,
            setError: action,
            resetError: action,
        });
        this.errorInfo = null;
        this.queryStatus = QueryStatus.FINISHED;
    }

    setError(errorInfo: ErrorInfo) {
        runInAction(() => {
            this.errorInfo = errorInfo;
        });
    }

    resetError() {
        runInAction(() => {
            this.errorInfo = null;
        });
    }

    setQueryStatus(queryStatus: QueryStatus) {
        runInAction(() => {
            this.queryStatus = queryStatus;
        });
    }
}
