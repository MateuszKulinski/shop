import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./ProductMiniature.module.scss";
import noImage from "./../../../assets/images/no-photos.png";

const ProductMiniature = ({ name, index, price, id }) => {
    return (
        <Col sm={6} md={4} lg={3} xl={2}>
            <article className={styles.product_miniature}>
                <Link to={`/product-${id}`} title={name}>
                    <img src={noImage} />
                    <h6 className={styles.__name}>{name}</h6>
                    <p>{index}</p>
                    <span>{price}</span>
                </Link>
            </article>
        </Col>
    );
};

export default ProductMiniature;
