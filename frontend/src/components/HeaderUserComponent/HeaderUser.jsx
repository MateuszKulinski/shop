import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as userIcon } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreProvider";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { APP_LOCAL_STORAGE_PREFIX } from "../../constants";
import styles from "../HeaderComponent/Header.module.scss";

const HeaderUser = () => {
    const { user, setToken, setUser } = useContext(StoreContext);
    console.log(styles);
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
            <FontAwesomeIcon icon={userIcon} size="2x" className={styles.svg} />
        </Link>
    );

    return headerUserContent;
};

export default HeaderUser;
