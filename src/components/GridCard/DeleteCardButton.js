import React from "react";
import styled from "styled-components";
import { layout } from "../../util/constants";
import PropTypes from "prop-types";

const DeleteCardButton = props => {
    return <Button onClick={props.handleDeleteCard.bind(this, props.id)}>x</Button>;
};

const Button = styled.button`
    font-family: "Montserrat", sans-serif;
    position: absolute;
    z-index: 100;
    display: inline-block;
    width: ${layout.deleteCardButtonWidth};
    height: ${layout.deleteCardButtonHeight};

    background-color: #fff;
    color: #000;
    border: none;

    padding: 2px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;

    opacity: 0;
    border-radius: 3px;
`;

DeleteCardButton.propTypes = {
    id: PropTypes.string
};

export default DeleteCardButton;
