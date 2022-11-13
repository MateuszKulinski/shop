import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as userIcon } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreProvider";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { APP_LOCAL_STORAGE_PREFIX } from "../../constants";

const HeaderUser = () => {
    const { user, setToken, setUser } = useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem(`${APP_LOCAL_STORAGE_PREFIX}token`);
        setToken(null);
        setUser(null);
    };

    const headerUserContent = user ? (
        <>
            Witaj {user.firstname} <Button onClick={logout}>Wyloguj</Button>{" "}
        </>
    ) : (
        <Link to={`/login`}>
            <FontAwesomeIcon icon={userIcon} size="2x" />
        </Link>
    );

    return headerUserContent;
};

export default HeaderUser;
