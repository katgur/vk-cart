import { Image, Text, RichCell } from "@vkontakte/vkui";
import { ReactNode } from "react";
import useCart from "../hooks/useCart";
import { observer } from "mobx-react-lite";

interface ProductCellProps {
    id: number;
    after: ReactNode;
}

const ProductCell = observer(({ id, after }: ProductCellProps) => {
    const cart = useCart();

    const product = cart.products.get(id);

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
