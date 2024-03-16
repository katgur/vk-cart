import { observer } from "mobx-react-lite";
import { Group, Pagination } from "@vkontakte/vkui";
import { PaginationStore } from "../model";

interface PaginationGroupProps {
    pagination: PaginationStore;
}

const PaginationGroup = observer(({ pagination }: PaginationGroupProps) => {
    const { limit, skip, total } = pagination;

    if (!total) {
        return;
    }

    return (
        <Group>
            <Pagination
                currentPage={Math.floor(skip / limit) + 1}
                totalPages={Math.ceil(total / limit)}
                onChange={(page) => pagination.setPage(page)}
            />
        </Group>
    );
});

export default PaginationGroup;
