import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import validator from "validator";
import axios from "axios";
import { API_URL } from "../../constants";
import styles from "./Contact.module.scss";

class Contact extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        check: false,
        accept: false,
        errors: {
            firstname: false,
            lastname: false,
            email: false,
            message: false,
            check: false,
        },
    };

    messages = {
        loremIpsumText:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore repellendus ex suscipit nesciunt dignissimos, sunt voluptatibus numquam, doloribus maxime animi magni recusandae. Vero atque repudiandae illo fuga hic debitis quas.",
        errors: {
            firstname: "Nie poprawne imię",
            lastname: "Nie poprawne nazwisko",
            email: "Nie poprawny adres e-mail",
            message: "Wiadomość nie może być pusta",
            check: "Zaznacz obowiązkową zgodę",
        },
    };

    resetState = () => {
        this.setState({
            firstname: "",
            lastname: "",
            email: "",
            message: "",
            check: false,
            accept: false,
            errors: {
                firstname: false,
                lastname: false,
                email: false,
                message: false,
                check: false,
            },
        });
    };

    formValidate = () => {
        let firstname = false;
        let lastname = false;
        let email = false;
        let message = false;
        let check = false;
        let correct = false;

        if (this.state.firstname.length > 3) {
            firstname = true;
        }

        if (this.state.lastname.length > 3) {
            lastname = true;
        }

        if (validator.isEmail(this.state.email)) {
            email = true;
        }

        if (this.state.message.trim() !== "") {
            message = true;
        }

        if (this.state.check) {
            check = true;
        }
        if (firstname && lastname && email && message && check) {
            correct = true;
        }
        return {
            firstname,
            lastname,
            email,
            message,
            check,
            correct,
        };
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const validate = this.formValidate();

        if (validate.correct) {
            const { firstname, lastname, email, message, check } = this.state;
            const messageData = {
                firstname,
                lastname,
                email,
                message,
                check,
            };
            try {
                const response = await axios.post(
                    `${API_URL}sendEmail`,
                    messageData
                );
            } catch (error) {
                console.warn(error);
            }

            this.resetState();
        } else {
            this.setState({
                errors: {
                    firstname: !validate.firstname,
                    lastname: !validate.lastname,
                    email: !validate.email,
                    message: !validate.message,
                    check: !validate.check,
                },
            });
        }
    };

    handleChange = (e) => {
        const stateName = e.target.name;
        const type = e.target.type;

        if (type === "checkbox") {
            const checked = e.target.checked;
            this.setState({ check: checked });
        } else if (
            type === "text" ||
            type === "password" ||
            type === "email" ||
            type === "textarea"
        ) {
            let value = e.target.value;
            if (stateName === "firstname" || stateName === "lastname") {
                value = value.replace(/[^a-z]/gi, "");
            }
            this.setState({ [stateName]: value });
        }
    };

    render() {
        return (
            <Container>
                <h2>Skontaktuj się z nami</h2>
                <Form
                    onSubmit={this.handleSubmit}
                    className={styles.contactForm}
                >
                    <Form.Group>
                        <Form.Label htmlFor="firstname">Imię</Form.Label>
                        <Form.Control
                            id="firstname"
                            name="firstname"
                            type="text"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.firstname}
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
                            type="text"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.lastname}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {this.messages.errors.lastname}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="email">E-mail</Form.Label>
                        <Form.Control
                            id="email"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.email}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {this.messages.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="message">Wiadomość</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="message"
                            name="message"
                            type="textarea"
                            rows={3}
                            value={this.state.message}
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.message}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {this.messages.errors.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={styles.formCheck}>
                        <Form.Check
                            id="check"
                            name="check"
                            onChange={this.handleChange}
                            isInvalid={this.state.errors.check}
                            checked={this.check}
                            label={this.messages.loremIpsumText}
                        />
                    </Form.Group>

                    <Form.Group controlId="submit">
                        <Button type="submit" variant="primary">
                            Wyślij
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}

export default Contact;
