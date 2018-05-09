import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class TextArea extends Component {
    render() {
        return (
            <Wrapper
                wrap="hard"
                onChange={this.props.handleTextAreaChange.bind(this, this.props.id)}
                type="textarea"
                value={this.props.textAreaValue}
                color={this.props.color}
            />
        );
    }
}

const Wrapper = styled.textarea`
    font-family: "Permanent Marker", cursive;
    color: #222;

    background-color: ${props => props.color};
    font-size: 30px;
    resize: none;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 25px;
    padding: 25px;
    width: 100%;
    margin: 0px auto;
    border: none;
    :focus {
        outline: 2px grey; /* oranges! yey */
    }
`;

TextArea.propTypes = {
    value: PropTypes.string,
    color: PropTypes.string
};
export default TextArea;
