import React, { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import { firstColor } from "../../colors";
import styles from "./Main.module.scss";
import axios from "axios";
import {
    API_ROUTES_PRODUCT,
    API_URL,
    MAIN_PAGE_PRODUCTS_COUNT,
} from "../../constants";
import ProductMiniature from "../../components/subcomponents/ProductMiniature";

const Main = () => {
    const [products, setProducts] = useState(null);

    useEffect(async () => {
        const { data: products } = await axios.get(
            `${API_URL}${API_ROUTES_PRODUCT}getRandomProduct/${MAIN_PAGE_PRODUCTS_COUNT}`
        );
        setProducts(products.data);
    }, []);

    const productsContent = products ? (
        products.map((product) => (
            <ProductMiniature {...product} key={product.id} />
        ))
    ) : (
        <p className="d-flex justify-content-center pt-3">
            <BounceLoader color={firstColor} size={120} />
        </p>
    );

    return (
        <Row className={styles.__center}>
            <h2>Nasze produkty</h2>
            {productsContent}
        </Row>
    );
};

export default Main;
