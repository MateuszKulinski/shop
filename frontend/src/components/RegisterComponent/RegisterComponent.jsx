import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./RegisterComponent.module.scss";
import validator from "validator";
import {
    BIRHDAY_DEF_DATE,
    BIRHDAY_MAX_DATE_FROM_TODAY,
    BIRHDAY_MIN_DATE_FROM_TODAY,
    MIN_LENGTH_FIRSTNAME,
    MIN_LENGTH_LASTNAME,
    MIN_LENGTH_PASS,
} from "../../constants";

class RegisterComponent extends Component {
    state = {
        registerForm: {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            passwordRepeat: "",
            birthday: BIRHDAY_DEF_DATE,
            check: false,
        },
        registerErrors: {
            email: false,
            firstname: false,
            lastname: false,
            password: false,
            check: false,
        },
    };
    messages = {
        loremIpsumText:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore repellendus ex suscipit nesciunt dignissimos, sunt voluptatibus numquam, doloribus maxime animi magni recusandae. Vero atque repudiandae illo fuga hic debitis quas.",

        errors: {
            firstname: `Imię musi mieć więcej niż ${MIN_LENGTH_FIRSTNAME} znaki`,
            lastname: `Nazwisko musi mieć więcej niż ${MIN_LENGTH_LASTNAME} znaki`,
            email: "Nie poprawny adres e-mail",
            check: "Zaznacz obowiązkową zgodę",
            password: `Minimalna długość hasła to ${MIN_LENGTH_PASS} znaków. Hasło musi zawierać małą literę, dużą literę, cyfrę oraz symbol`,
            passwordRepeat: "Hasła nie są takie same",
            unauthorized: "Błędny e-mail lub hasło",
        },
    };

    resetRegisterState = () => {
        this.setState({
            registerForm: {
                email: "",
                firstname: "",
                lastname: "",
                password: "",
                passwordRepeat: "",
                birthday: null,
                check: false,
            },
            registerErrors: {
                email: false,
                firstname: false,
                lastname: false,
                password: false,
                check: false,
            },
        });
    };

    registerFormValidate = () => {
        let email = false;
        let firstname = false;
        let lastname = false;
        let password = false;
        let passwordRepeat = false;
        let check = false;
        let correct = false;
        const { registerForm } = this.state;
        console.log(registerForm);
        if (validator.isEmail(registerForm.email)) {
            email = true;
        }
        if (registerForm.firstname >= MIN_LENGTH_FIRSTNAME) {
            firstname = true;
        }
        if (registerForm.lastname >= MIN_LENGTH_LASTNAME) {
            lastname = true;
        }
        if (
            validator.isStrongPassword(registerForm.password, {
                minLength: MIN_LENGTH_PASS,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
            })
        ) {
            password = true;
        }
        if (password && registerForm.password === registerForm.passwordRepeat) {
            passwordRepeat = true;
        }
        if (registerForm.check) {
            check = true;
        }
        if (
            email &&
            firstname &&
            lastname &&
            password &&
            passwordRepeat &&
            check
        ) {
            correct = true;
        }
        return {
            email,
            firstname,
            lastname,
            password,
            passwordRepeat,
            check,
            correct,
        };
    };

    handleOnChangeRegisterForm = (e) => {};

    register = (e) => {
        e.preventDefault();
        const validate = this.registerFormValidate();
        if (validate.correct) {
        } else {
            this.setState({
                registerErrors: {
                    email: !validate.email,
                    firstname: !validate.firstname,
                    lastname: !validate.lastname,
                    password: !validate.password,
                    passwordRepeat: !validate.passwordRepeat,
                    check: !validate.check,
                },
            });
        }
    };

    render() {
        const now = new Date();

        const maxDate = `${now.getFullYear() - BIRHDAY_MAX_DATE_FROM_TODAY}-${
            now.getMonth() + 1
        }-${now.getDate()}`;

        const minDate = `${now.getFullYear() - BIRHDAY_MIN_DATE_FROM_TODAY}-${
            now.getMonth() + 1
        }-${now.getDate()}`;

        return (
            <Form onSubmit={this.register}>
                <Form.Group>
                    <Form.Label htmlFor="email">E-mail</Form.Label>
                    <Form.Control
                        id="email"
                        name="email"
                        type="email"
                        value={this.state.registerForm.email}
                        onChange={this.handleOnChangeRegisterForm}
                        isInvalid={this.state.registerErrors.email}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {this.messages.errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="firstname">Imię</Form.Label>
                    <Form.Control
                        id="firstname"
                        name="firstname"
                        type="firstname"
                        value={this.state.registerForm.firstname}
                        onChange={this.handleOnChangeRegisterForm}
                        isInvalid={this.state.registerErrors.firstname}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {this.messages.errors.firstname}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="lastname">Nazwisko</Form.Label>
                    <Form.Control
                        id="lastname"
                        name="lastname"
                        type="lastname"
                        value={this.state.registerForm.lastname}
                        onChange={this.handleOnChangeRegisterForm}
                        isInvalid={this.state.registerErrors.lastname}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {this.messages.errors.lastname}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Hasło</Form.Label>
                    <Form.Control
                        id="password"
                        name="password"
                        type="password"
                        value={this.state.registerForm.password}
                        onChange={this.handleOnChangeRegisterForm}
                        isInvalid={this.state.registerErrors.password}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {this.messages.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="passwordRepeat">
                        Powtórz hasło
                    </Form.Label>
                    <Form.Control
                        id="passwordRepeat"
                        name="passwordRepeat"
                        type="passwordRepeat"
                        value={this.state.registerForm.passwordRepeat}
                        onChange={this.handleOnChangeRegisterForm}
                        isInvalid={this.state.registerErrors.passwordRepeat}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {this.messages.errors.passwordRepeat}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="birthday">Data urodzenia</Form.Label>
                    <Form.Control
                        id="birthday"
                        name="birthday"
                        type="date"
                        min={minDate}
                        max={maxDate}
                        value={this.state.registerForm.birthday}
                        onChange={this.handleOnChangeRegisterForm}
                        isInvalid={this.state.registerErrors.birthday}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {this.messages.errors.birthday}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        id="check"
                        name="check"
                        onChange={this.handleOnChangeRegisterForm}
                        isInvalid={this.state.registerErrors.check}
                        checked={this.state.registerForm.check}
                        label={this.messages.loremIpsumText}
                    />
                </Form.Group>
                <Form.Group className="text-center">
                    <Button
                        type="submit"
                        variant="primary"
                        className={styles.button}
                    >
                        Zarejestruj
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default RegisterComponent;
