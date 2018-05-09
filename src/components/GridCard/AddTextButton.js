import React from "react";
import styled from "styled-components";
import SharpieImg from "../../images/sharpie.svg";
import PropTypes from "prop-types";

const AddTextButton = props => {
    return (
        <Button onClick={props.handleAddText.bind(this, props.id)}>
            <img src={SharpieImg} alt="Add Text" />
        </Button>
    );
};

const Button = styled.button`
    font-family: "Montserrat", sans-serif;

    position: absolute;
    z-index: 100;
    display: inline-block;
    width: 25px;
    height: 25px;

    right: 0px;

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

AddTextButton.propTypes = {
    id: PropTypes.string
};

export default AddTextButton;
