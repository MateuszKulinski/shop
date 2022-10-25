import React from "react";
import { LoremIpsum } from "react-lorem-ipsum";
import { Container } from "react-bootstrap";

const AboutUs = () => {
    return (
        <Container>
            <h2>O nas</h2>
            <p>
                <LoremIpsum p={4} />
            </p>
        </Container>
    );
};

export default AboutUs;
