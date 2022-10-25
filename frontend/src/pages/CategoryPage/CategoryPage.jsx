import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { API_ROUTES_CATEGORY, API_URL } from "../../constants";
import { BounceLoader } from "react-spinners";
import { firstColor } from "../../colors";

const CategoryPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        getCategoryData();
        getProducts();
    }, []);

    const getCategoryData = async () => {
        const { data } = await axios.get(
            `${API_URL}${API_ROUTES_CATEGORY}${id}`
        );
        setCategory(data);
    };

    const getProducts = async () => {};

    const pageContent =
        category && products ? (
            <>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
            </>
        ) : (
            <BounceLoader color={firstColor} size={50}></BounceLoader>
        );

    return (
        <Container className="d-flex justify-content-center align-items-center flex-column pt-3">
            {pageContent}
        </Container>
    );
};

export default CategoryPage;
