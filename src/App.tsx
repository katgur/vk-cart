import { useEffect, useState } from "react";
import api from "./entities/products/api/index";

function App() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        api.getProducts().then((products) => {
            setProducts(products);
        });
    }, []);
    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>{product.title}</li>
            ))}
        </ul>
    );
}

export default App;
