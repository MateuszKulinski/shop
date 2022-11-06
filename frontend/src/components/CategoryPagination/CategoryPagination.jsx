import React, { useState } from "react";
import { faCaretLeft as faPrev } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight as faNext } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PAGINATION_RANGE } from "../../constants";

const CategoryPagination = ({
    pageCurrent,
    pageCount,
    itemsCount,
    setPageHandler,
}) => {
    const firstButtonContent =
        pageCurrent > 3 ? (
            <button onClick={() => setPageHandler("FIRST")}>
                <FontAwesomeIcon icon={faPrev} />
                <FontAwesomeIcon icon={faPrev} />
            </button>
        ) : null;

    const prevButtonContent =
        pageCurrent > 2 ? (
            <button onClick={() => setPageHandler("PREV")}>
                <FontAwesomeIcon icon={faPrev} />
            </button>
        ) : null;

    const nextButtonContent =
        pageCurrent + 1 < pageCount ? (
            <button onClick={() => setPageHandler("NEXT")}>
                <FontAwesomeIcon icon={faNext} />
            </button>
        ) : null;

    const lastButtonContent =
        pageCurrent + 2 < pageCount ? (
            <button onClick={() => setPageHandler("LAST")}>
                <FontAwesomeIcon icon={faNext} />
                <FontAwesomeIcon icon={faNext} />
            </button>
        ) : null;

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
            <button key={i} className="buttonNumber active">
                {i}
            </button>
        ) : (
            <button
                key={i}
                className="buttonNumber"
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
