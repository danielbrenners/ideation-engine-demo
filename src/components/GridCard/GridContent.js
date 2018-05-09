import React, { Component } from "react";
import styled from "styled-components";
import Image from "./CardImage";
import TextArea from "./TextArea";
import PropTypes from "prop-types";

class GridContent extends Component {
    render() {
        let cardContent;
        if (this.props.url && this.props.type === "image") {
            cardContent = <Image alt="alt" url={this.props.url} />;
        } else if (this.props.type === "text") {
            cardContent = (
                <TextArea
                    id={this.props.id}
                    color={this.props.color}
                    handleTextAreaChange={this.props.handleTextAreaChange}
                    textAreaValue={this.props.textAreaValue}
                />
            );
        } else {
            cardContent = null;
        }
        return <Wrapper>{cardContent}</Wrapper>;
    }
}

const Wrapper = styled.div`
    width: 250px;
    height: 150px;
    text-align: center;
    color: black;
    font-size: 20px;
    margin: 10px;
    display: inline-block;
    overflow: hidden;
`;

GridContent.propTypes = {
    type: PropTypes.string,
    url: PropTypes.string,
    textAreaValue: PropTypes.string,
    color: PropTypes.string
};

export default GridContent;
