import React from "react";
import styles from "./Content.module.scss";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Main from "../../pages/Main/Main";
import Contact from "../../pages/ContactPage/Contact";
import AboutUs from "../../pages/AboutUsPage/AboutUs";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import AuthPage from "../../pages/AuthPage/AuthPage";
import { StoreContext } from "../../store/StoreProvider";
import { useContext, useEffect } from "react";
import axios from "axios";
import {
    API_ROUTES_USER,
    API_URL,
    APP_LOCAL_STORAGE_PREFIX,
} from "../../constants";

const Content = () => {
    const { user, token, setUser, setToken } = useContext(StoreContext);
    useEffect(() => {
        getUser();
    });
    const getUser = async () => {
        if (token && !user) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const { data: user } = await axios.post(
                    `${API_URL}${API_ROUTES_USER}getUserData`,
                    null,
                    config
                );
                setUser(user);
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem(`${APP_LOCAL_STORAGE_PREFIX}token`);
                    setToken(null);
                    setUser(null);
                }
                console.log(err);
            }
        }
    };
    return (
        <Container className={styles.mainContainer}>
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/category-:id" element={<CategoryPage />} />
                <Route path="/product-:id" element={<ProductPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="*" element={<Main />} />
            </Routes>
        </Container>
    );
};

export default Content;
