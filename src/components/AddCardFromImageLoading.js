import React from "react";
import styled from "styled-components";

const AddTextCardFromImageAnimation = () => {
    return <LoadingAnimation />;
};

export default AddTextCardFromImageAnimation;

const LoadingAnimation = styled.div`
    display: inline-block;
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #3498db;
    width: 50px;
    height: 50px;
    position: relative;
    bottom: 0px;
    padding: 2px;
    margin: 10px 0px 10px 10px;

    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
