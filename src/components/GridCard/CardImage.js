import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CardImage = props => {
    return <Wrapper src={props.url} alt={props.alt} />;
};

const Wrapper = styled.img`
    border-radius: 3px;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;

    position: absolute;

    top: 0px;
    left: 0px;
    margin: auto;

    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

CardImage.propTypes = {
    url: PropTypes.string,
    alt: PropTypes.string
};

export default CardImage;
