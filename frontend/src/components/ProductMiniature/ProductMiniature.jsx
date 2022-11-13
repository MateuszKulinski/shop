import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./ProductMiniature.module.scss";
import noImage from "./../../../assets/images/no-photos.png";

const ProductMiniature = ({ name, index, price, id, priceDisplay }) => {
    return (
        <Col
            xl={3}
            lg={3}
            md={{ span: 6, offset: 0 }}
            sm={{ span: 10, offset: 1 }}
        >
            <article className={styles.product_miniature}>
                <Link
                    to={`/product-${id}`}
                    title={name}
                    className={styles.linkContainer}
                >
                    <img src={noImage} />
                    <div className={styles.dataContainer}>
                        {" "}
                        <h6 className={styles.name}>{name}</h6>
                        <p className={styles.index}>{index}</p>
                        <span className={styles.price}>{priceDisplay}</span>
                    </div>
                </Link>
            </article>
        </Col>
    );
};

export default ProductMiniature;
