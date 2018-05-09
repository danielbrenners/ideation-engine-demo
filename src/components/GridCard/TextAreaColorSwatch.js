import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextAreaColorSwatch = props => {
    return (
        <Wrapper
            onClick={props.handleColorSwatchChange.bind(this, props.id, props.color)}
            color={props.color}
            className="text-area-color-swatch"
        />
    );
};

const Wrapper = styled.button`
    position: relative;
    opacity: 1;
    display: inline-block;
    width: 25px;
    height: 100%;
    margin-left: 10px;
    border: 1px solid #555;
    background-color: ${props => props.color};
    padding: 2px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    opacity: 0;
`;

TextAreaColorSwatch.propTypes = {
    id: PropTypes.string,
    currentColor: PropTypes.string
};
export default TextAreaColorSwatch;
