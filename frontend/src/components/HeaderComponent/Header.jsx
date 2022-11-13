import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome as homeIcon } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import axios from "axios";
import { API_ROUTES_CATEGORY, API_URL } from "../../constants";
import LoadComponent from "../../components/LoadComponent/LoadComponent";
import HeaderUser from "../HeaderUserComponent/HeaderUser";

const Header = () => {
    const [categories, setCategories] = useState(null);
    useEffect(async () => {
        const categoriesData = await axios.get(
            `${API_URL}${API_ROUTES_CATEGORY}getMainCategories/name`
        );
        setCategories(categoriesData.data);
    }, []);

    const dropdownContent = categories ? (
        categories.map((category) => (
            <Link
                key={category.id}
                to={`/category-${category.id}`}
                title={category.name}
                className="no-underline first-color dropdown-item"
            >
                {category.name}
            </Link>
        ))
    ) : (
        <DropdownItem>
            <LoadComponent />
        </DropdownItem>
    );

    const hideDropdown = (e) => {
        console.log(e);
    };

    return (
        <Navbar fixed="top" variant="dark" className="bg-dark">
            <Container>
                <Row className="align-items-center">
                    <Col xs={3}>
                        <Link to="/" title="HOME">
                            <FontAwesomeIcon icon={homeIcon} size="2x" />
                        </Link>
                    </Col>
                    <Col xs={6}>
                        <ul className="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0 justify-content-center gap-3">
                            <li>
                                <Button variant="warning">
                                    <Link
                                        to="/contact"
                                        title="Kontakt"
                                        className="white-text no-underline"
                                    >
                                        Kontakt
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button variant="info">
                                    <Link
                                        to="/about-us"
                                        title="O nas"
                                        className="white-text no-underline"
                                    >
                                        O nas
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Dropdown onChange={hideDropdown}>
                                    <DropdownToggle>Kategorie</DropdownToggle>
                                    <DropdownMenu>
                                        {dropdownContent}
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        </ul>
                    </Col>
                    <Col
                        xs={3}
                        className="d-flex justify-content-end align-items-center text-white gap-1"
                    >
                        <HeaderUser />
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};

export default Header;
