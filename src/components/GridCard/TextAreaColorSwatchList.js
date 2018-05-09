import React from "react";
import styled from "styled-components";
import { color } from "../../util/constants";
import TextAreaColorSwatch from "./TextAreaColorSwatch";
import PropTypes from "prop-types";

const TextAreaColorSwatchList = props => {
    const possibleColors = [color.orange, color.pink, color.blue, color.green, color.yellow];

    const nonCurrentColors = possibleColors.filter(color => color !== props.currentColor);

    const swatches = nonCurrentColors.map(color => {
        return (
            <TextAreaColorSwatch
                id={props.id}
                key={color}
                color={color}
                handleColorSwatchChange={props.handleColorSwatchChange}
            />
        );
    });

    return <Wrapper className="text-area-color-swatch-list">{swatches}</Wrapper>;
};

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: transparent;
    position: absolute;
    width: 100%;
    height: 25px;
    z-index: 10;

    border: none;
`;

TextAreaColorSwatch.propTypes = {
    id: PropTypes.string,
    currentColor: PropTypes.string
};

export default TextAreaColorSwatchList;
