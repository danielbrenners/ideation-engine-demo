import React from "react";
import styled from "styled-components";
import { layout } from "../../util/constants.js";

const TextAreaFooter = props => {
    return <Wrapper className="text-area-footer" />;
};

const Wrapper = styled.div`
    position: absolute;
    display: inline-block;
    width: 100%;
    height: ${layout.textAreaFooterHeight};
    right: 0px;
    pointer-events: none; /* to click through to resize handle */
    bottom: 0px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    border: none;
    opacity: 0;
    padding: 2px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
`;

export default TextAreaFooter;
