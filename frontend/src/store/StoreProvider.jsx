import React, { createContext, useState } from "react";
import { APP_LOCAL_STORAGE_PREFIX } from "../constants";
React.createContext(true);

export const StoreContext = createContext("default");

const StoreProvider = ({ children }) => {
    const tokenStorage = localStorage.getItem(
        `${APP_LOCAL_STORAGE_PREFIX}token`
    );
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(tokenStorage);

    return (
        <StoreContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
