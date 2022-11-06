import { BounceLoader } from "react-spinners";
import { firstColor } from "../../colors";
import React from "react";

const LoadComponent = () => (
    <BounceLoader color={firstColor} size={50}></BounceLoader>
);
export default LoadComponent;
