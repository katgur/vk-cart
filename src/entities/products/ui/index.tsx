import { Image, Text, RichCell } from "@vkontakte/vkui";
import { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import cartStore from "../../../features/cart/model";

interface ProductCellProps {
    id: number;
    after: ReactNode;
}

const ProductCell = observer(({ id, after }: ProductCellProps) => {
    const store = cartStore;

    const product = store.products.get(id);

    if (!product) {
        return;
    }

    return (
        <RichCell
            before={
                <Image
                    size={96}
                    src={product.thumbnail}
                    alt={`Изображение товара ${product.title}`}
                />
            }
            text={product.description}
            caption={`${product.price} руб. / ${product.count} шт.`}
            after={after}
        >
            <Text weight="1">{product.title}</Text>
        </RichCell>
    );
});

export default ProductCell;
