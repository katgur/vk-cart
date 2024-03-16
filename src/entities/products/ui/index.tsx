import { Image, Text, RichCell } from "@vkontakte/vkui";
import { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import productsStore from "../model";

interface ProductCellProps {
    id: number;
    after: ReactNode;
}

const ProductCell = observer(({ id, after }: ProductCellProps) => {
    const products = productsStore;

    const product = products.all?.find((product) => product.id === id);

    if (!product) {
        return;
    }

    return (
        <RichCell
            before={
                <Image
                    size={96}
                    src={product.image}
                    alt={`Изображение товара ${product.title}`}
                />
            }
            text={product.description}
            caption={`${product.price} руб.`}
            after={after}
        >
            <Text weight="1">{product.title}</Text>
        </RichCell>
    );
});

export default ProductCell;
