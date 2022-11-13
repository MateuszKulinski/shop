import React from "react";
import "./App.scss";
import Header from "./components/HeaderComponent/Header";
import { BrowserRouter as Router } from "react-router-dom";
import StoreProvider from "./store/StoreProvider";
import Content from "./components/ContentComponent/Content";

const App = () => {
    return (
        <StoreProvider>
            <Router basename="/">
                <Header />
                <Content />
            </Router>
        </StoreProvider>
    );
};
export default App;
