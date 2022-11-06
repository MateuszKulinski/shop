import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import axios from "axios";
import { API_ROUTES_PRODUCT, API_URL } from "../../constants";
import LoadComponent from "../../components/LoadComponent/LoadComponent";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import noImage from "./../../../assets/images/no-photos.png";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const { data: productData } = await axios.get(
            `${API_URL}${API_ROUTES_PRODUCT}${id}`
        );
        setProduct(productData.data);
    };

    const pageContent = !product ? (
        <LoadComponent />
    ) : (
        <>
            <Col md={6} className={styles.__center}>
                <img src={noImage} />
            </Col>
            <Col md={6}>
                <h6>{product.name}</h6>
                <span>{product.index}</span>
                <p>{product.price}</p>
            </Col>
            <Col md={12}>
                <p>{product.description}</p>
            </Col>
        </>
    );

    console.log(product);
    return (
        <Container className="d-flex justify-content-center align-items-center flex-column pt-3">
            <Row>{pageContent}</Row>
        </Container>
    );
};

export default ProductPage;
