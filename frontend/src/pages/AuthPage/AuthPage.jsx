import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Component } from "react";
import styles from "./AuthPage.module.scss";
import { StoreContext } from "../../store/StoreProvider";
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import RegisterComponent from "../../components/RegisterComponent/RegisterComponent";

class AuthPage extends Component {
    static contextType = StoreContext;
    state = {
        isLoginForm: false, //false = register
    };

    changeWindow = (type) => {
        this.setState({ isLoginForm: type });
    };

    render() {
        const authPageContent = this.state.isLoginForm ? (
            <LoginComponent />
        ) : (
            <RegisterComponent />
        );

        return (
            <Container>
                <Row>
                    <Col xs={{ span: 6, offset: 3 }}>
                        <Row className={styles.rowContainer}>
                            <Col xs={12}>{authPageContent}</Col>
                            <Col xs={12}>
                                <Row className={styles.buttonsContainer}>
                                    <Col
                                        className={styles.windowChanger}
                                        xs={6}
                                        onClick={this.changeWindow.bind(
                                            this,
                                            true
                                        )}
                                        name="login"
                                    >
                                        Logowanie
                                    </Col>
                                    <Col
                                        className={`${styles.windowChanger} ${styles.register}`}
                                        xs={6}
                                        onClick={this.changeWindow.bind(
                                            this,
                                            false
                                        )}
                                        name="register"
                                    >
                                        Rejestracja
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AuthPage;
