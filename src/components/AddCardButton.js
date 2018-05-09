import React from "react";
import styled from "styled-components";
import addCardIcon from "../images/add_card_white.svg";
const AddCardButton = props => {
    return (
        <Button onClick={props.handleAddCard.bind(this, undefined, undefined, "transparent", undefined)}>
            <AddCardImage src={addCardIcon} />
        </Button>
    );
};

const Button = styled.button`
    position: relative;

    display: inline-block;
    width: 50px;
    height: 50px;

    background-color: #5596e6;
    color: #fff;

    padding: 2px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 50px 0px 10px 10px;
    border-radius: 50%;
`;

const AddCardImage = styled.img`
    width: 30px;
    margin-top: 0px;
`;

export default AddCardButton;
