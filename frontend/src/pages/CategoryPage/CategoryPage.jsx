import React from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
    API_ROUTES_CATEGORY,
    API_URL,
    CATEGORY_PRODUCTS_COUNT,
} from "../../constants";
import ProductMiniature from "../../components/ProductMiniature/ProductMiniature";
import CategoryPagination from "../../components/CategoryPagination/CategoryPagination";
import styles from "./Category.module.scss";
import LoadComponent from "../../components/LoadComponent/LoadComponent";

const CategoryPage = () => {
    const { id } = useParams();
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [itemsCount, setItemsCount] = useState(0);
    const [items, setItems] = useState(null);

    useEffect(() => {
        getNewData();
    }, [pageCurrent, id]);

    const getNewData = async () => {
        const pageData = await axios.get(
            `${API_URL}${API_ROUTES_CATEGORY}getPageProduct/${id}/${CATEGORY_PRODUCTS_COUNT}/${pageCurrent}`
        );
        setItems(pageData.data.items);
        setItemsCount(pageData.data.pagination.count);
        setPageCount(pageData.data.pagination.pageCount);
    };

    const setPageHandler = (newPage) => {
        switch (newPage) {
            case "FIRST":
                newPage = 1;
                break;
            case "PREV":
                newPage = pageCurrent - 1;
                break;
            case "NEXT":
                newPage = pageCurrent + 1;
                break;
            case "LAST":
                newPage = pageCount;
                break;
        }
        if (newPage) {
            setPageCurrent(newPage);
        }

        // setPageCurrent(page);
    };

    const pageContent = !items ? (
        <LoadComponent />
    ) : (
        <>
            <CategoryPagination
                pageCount={pageCount}
                itemsCount={itemsCount}
                setPageHandler={setPageHandler}
                pageCurrent={pageCurrent}
            />
            {items.map((product) => (
                <ProductMiniature {...product} key={product.id} />
            ))}
        </>
    );

    return (
        <Container className="d-flex justify-content-center align-items-center flex-column pt-3">
            <Row className={styles.__center}>{pageContent}</Row>
        </Container>
    );
};

export default CategoryPage;
