import React, { useState } from "react";
import { faCaretLeft as faPrev } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight as faNext } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PAGINATION_RANGE } from "../../constants";
import styles from "./CategoryPagination.module.scss";

const CategoryPagination = ({
    pageCurrent,
    pageCount,
    itemsCount,
    setPageHandler,
}) => {
    const firstButtonContent = (
        <button
            onClick={() => setPageHandler("FIRST")}
            className={
                pageCurrent > 3
                    ? styles.buttonNumber
                    : `${styles.buttonNumber} ${styles.disabled}`
            }
            disabled={pageCurrent > 3 ? false : true}
        >
            <FontAwesomeIcon icon={faPrev} />
            <FontAwesomeIcon icon={faPrev} />
        </button>
    );

    const prevButtonContent = (
        <button
            onClick={() => setPageHandler("PREV")}
            className={
                pageCurrent > 1
                    ? styles.buttonNumber
                    : `${styles.buttonNumber} ${styles.disabled}`
            }
            disabled={pageCurrent > 1 ? false : true}
        >
            <FontAwesomeIcon icon={faPrev} />
        </button>
    );

    const nextButtonContent = (
        <button
            onClick={() => setPageHandler("NEXT")}
            className={
                pageCurrent < pageCount
                    ? styles.buttonNumber
                    : `${styles.buttonNumber} ${styles.disabled}`
            }
            disabled={pageCurrent < pageCount ? false : true}
        >
            <FontAwesomeIcon icon={faNext} />
        </button>
    );

    const lastButtonContent = (
        <button
            onClick={() => setPageHandler("LAST")}
            className={
                pageCurrent + 2 < pageCount
                    ? styles.buttonNumber
                    : `${styles.buttonNumber} ${styles.disabled}`
            }
            disabled={pageCurrent + 2 < pageCount ? false : true}
        >
            <FontAwesomeIcon icon={faNext} />
            <FontAwesomeIcon icon={faNext} />
        </button>
    );

    const pageFrom = pageCurrent - PAGINATION_RANGE;
    const pageTo = pageCurrent + PAGINATION_RANGE;

    const pageNumber = [];
    for (let i = pageFrom; i <= pageTo; i++) {
        if (i > 0 && i <= pageCount) {
            pageNumber.push(i);
        }
    }

    const numberButtonsContent = pageNumber.map((i) =>
        i === pageCurrent ? (
            <button
                key={i}
                className={`${styles.buttonNumber} ${styles.active}`}
            >
                {i}
            </button>
        ) : (
            <button
                key={i}
                className={styles.buttonNumber}
                onClick={() => setPageHandler(i)}
            >
                {i}
            </button>
        )
    );

    return (
        <div>
            {firstButtonContent}
            {prevButtonContent}
            {numberButtonsContent}
            {nextButtonContent}
            {lastButtonContent}
        </div>
    );
};

export default CategoryPagination;
