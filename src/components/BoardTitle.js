import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const BoardTitle = props => {
    return (
        <Wrapper
            onChange={props.handleBoardNameChange}
            type="textarea"
            value={props.userData["projects"][props.currentProject]["boards"][props.currentBoard]["name"]}
        />
    );
};
const Wrapper = styled.input`
    font-family: "Montserrat", sans-serif;
    letter-spacing: 1px;

    padding: 25px;

    width: 100%;
    height: 50px;
    font-size: 35px;
    font-weight: 700;

    border: none;
    text-align: left;

    margin-top: 40px;
    margin-left: 80px;
    margin-bottom: 25px;

    :focus {
        outline: 0;
    }
    background-color: #f0f0f0;
`;

BoardTitle.propTypes = {
    currentProject: PropTypes.string,
    currentBoard: PropTypes.string
};

export default BoardTitle;
