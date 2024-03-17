import { Image, Text, RichCell } from "@vkontakte/vkui";
import { ReactNode } from "react";
import { Product } from "../model";

interface ProductCellProps {
    product: Product | null;
    after: ReactNode;
}

function ProductCell({ product, after }: ProductCellProps) {
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
}

export default ProductCell;
