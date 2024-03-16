import { action, makeObservable, observable, runInAction } from "mobx";

export class PaginationStore {
    limit: number;
    skip: number;
    total?: number;

    constructor(limit: number) {
        makeObservable(this, {
            limit: observable,
            skip: observable,
            total: observable,
            setPage: action,
            setTotal: action,
        });
        this.limit = limit;
        this.skip = 0;
    }

    setPage(page: number) {
        runInAction(() => {
            this.skip = this.limit * (page - 1);
        });
    }

    setTotal(total: number) {
        runInAction(() => {
            this.total = total;
            this.skip = 0;
        });
    }
}
