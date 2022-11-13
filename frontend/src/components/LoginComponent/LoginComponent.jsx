import React from "react";
import { Component } from "react";
import validator from "validator";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import styles from "./LoginComponent.module.scss";
import {
    API_ROUTES_USER,
    API_URL,
    APP_LOCAL_STORAGE_PREFIX,
    MIN_LENGTH_PASS,
} from "../../constants";
import { StoreContext } from "../../store/StoreProvider";

class LoginComponent extends Component {
    static contextType = StoreContext;
    state = {
        loginForm: {
            loginEmail: "",
            loginPassword: "",
        },
        loginErrors: {
            loginEmail: false,
            loginPassword: false,
            unauthorized: false,
        },
    };

    messages = {
        errors: {
            email: "Nie poprawny adres e-mail",
            password: `Hasło musi mieć minimum ${MIN_LENGTH_PASS} znaków`,
            unauthorized: "Błędny e-mail lub hasło",
        },
    };

    resetLoginState = () => {
        this.setState({
            loginForm: {
                email: "",
                password: "",
            },
            loginErrors: {
                email: false,
                password: false,
            },
        });
    };

    loginFormValidate = () => {
        let loginEmail = false;
        let loginPassword = false;
        let unauthorized = true;
        let correct = false;

        if (validator.isEmail(this.state.loginForm.loginEmail)) {
            loginEmail = true;
        }
        if (this.state.loginForm.loginPassword.length >= MIN_LENGTH_PASS) {
            loginPassword = true;
        }

        if (loginEmail && loginPassword) {
            correct = true;
        }
        return {
            loginEmail,
            loginPassword,
            unauthorized,
            correct,
        };
    };

    login = async (e) => {
        e.preventDefault();
        const validate = this.loginFormValidate();

        if (validate.correct) {
            const { loginEmail: email, loginPassword: password } =
                this.state.loginForm;
            try {
                const params = { email, password };
                const { data: tokenNew } = await axios.post(
                    `${API_URL}${API_ROUTES_USER}login`,
                    params
                );

                const { setToken, setUser } = this.context;
                setToken(tokenNew);

                localStorage.setItem(
                    `${APP_LOCAL_STORAGE_PREFIX}token`,
                    tokenNew
                );

                const config = {
                    headers: {
                        Authorization: `Bearer ${tokenNew}`,
                    },
                };
                const { data: user } = await axios.post(
                    `${API_URL}${API_ROUTES_USER}getUserData`,
                    null,
                    config
                );
                setUser(user);
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 401) {
                        const loginErrors = { ...this.state.loginErrors };
                        loginErrors.unauthorized = true;
                        this.setState({ loginErrors });
                    }
                }
                console.log(err);
            }
        } else {
            this.setState({
                loginErrors: {
                    loginEmail: !validate.loginEmail,
                    loginPassword: !validate.loginPassword,
                    unauthorized: !validate.unauthorized,
                },
            });
        }
    };

    handleChangeLoginForm = (e) => {
        const stateName = e.target.name;
        const type = e.target.type;
        if (type === "text" || type === "password" || type === "email") {
            let value = e.target.value;
            if (stateName === "firstname" || stateName === "lastname") {
                value = value.replace(/[^a-z]/gi, "");
            }
            const loginForm = { ...this.state.loginForm };
            loginForm[stateName] = value;
            this.setState({ loginForm });
        }
    };

    render() {
        return (
            <Form onSubmit={this.login}>
                <Form.Group>
                    <Form.Label htmlFor="loginEmail">E-mail</Form.Label>
                    <Form.Control
                        id="loginEmail"
                        name="loginEmail"
                        type="email"
                        value={this.state.loginForm.email}
                        onChange={this.handleChangeLoginForm}
                        isInvalid={this.state.loginErrors.email}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {this.messages.errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="loginPassword">Hasło</Form.Label>
                    <Form.Control
                        id="loginPassword"
                        name="loginPassword"
                        type="password"
                        value={this.state.loginForm.password}
                        onChange={this.handleChangeLoginForm}
                        isInvalid={this.state.loginErrors.loginPassword}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {this.messages.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="hidden"
                        isInvalid={this.state.loginErrors.unauthorized}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {this.messages.errors.unauthorized}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="text-center">
                    <Button
                        type="submit"
                        variant="primary"
                        className={styles.button}
                    >
                        Zaloguj
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default LoginComponent;
