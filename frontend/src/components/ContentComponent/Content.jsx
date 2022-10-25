import React from "react";
import styles from "./Content.module.scss";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Main from "../../pages/Main/Main";
import Contact from "../../pages/ContactPage/Contact";
import AboutUs from "../../pages/AboutUsPage/AboutUs";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";

const Content = () => {
    return (
        <Container className={styles.mainContainer}>
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="*" element={<Main />} />
            </Routes>
        </Container>
    );
};

export default Content;
