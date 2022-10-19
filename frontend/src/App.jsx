import React from "react";

import "./App.scss";
import Header from "./components/HeaderComponent/Header";
import { HashRouter as Router } from "react-router-dom";
import StoreProvider from "./store/StoreProvider";

const App = () => (
    <StoreProvider>
        <Router>
            <Header />
        </Router>
    </StoreProvider>
);
export default App;
