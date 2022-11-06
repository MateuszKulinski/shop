import React, { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import styles from "./Main.module.scss";
import axios from "axios";
import {
    API_ROUTES_PRODUCT,
    API_URL,
    MAIN_PAGE_PRODUCTS_COUNT,
} from "../../constants";
import ProductMiniature from "../../components/ProductMiniature/ProductMiniature";
import LoadComponent from "../../components/LoadComponent/LoadComponent";

const Main = () => {
    const [products, setProducts] = useState(null);

    useEffect(async () => {
        const { data: products } = await axios.get(
            `${API_URL}${API_ROUTES_PRODUCT}getRandomProducts/${MAIN_PAGE_PRODUCTS_COUNT}`
        );
        setProducts(products.data);
    }, []);

    const productsContent = products ? (
        products.map((product) => (
            <ProductMiniature {...product} key={product.id} />
        ))
    ) : (
        <p className="d-flex justify-content-center pt-3">
            <LoadComponent />
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
