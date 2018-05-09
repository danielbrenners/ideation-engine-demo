import React, { Component } from "react";
import styled from "styled-components";
import GridContent from "./GridContent";
import PropTypes from "prop-types";

import DeleteCardButton from "./DeleteCardButton";
import AddTextButton from "./AddTextButton";
import AddImageButton from "./AddImageButton";
import TextAreaFooter from "./TextAreaFooter";
import TextAreaColorSwatchList from "./TextAreaColorSwatchList";

class GridCard extends Component {
    render() {
        let addTextOrNot = null;
        let addImageOrNot = null;
        let changeColorOrNot = null;
        let textFooterOrNot = null;

        if (this.props.type === undefined) {
            addTextOrNot = <AddTextButton id={this.props.id} handleAddText={this.props.handleAddText} />;
            addImageOrNot = (
                <AddImageButton
                    id={this.props.id}
                    handleAddText={this.props.handleAddText}
                    handleCardImageChange={this.props.handleCardImageChange}
                />
            );
        }
        if (this.props.type === "text") {
            changeColorOrNot = (
                <TextAreaColorSwatchList
                    id={this.props.id}
                    currentColor={this.props.color}
                    handleColorSwatchChange={this.props.handleColorSwatchChange}
                />
            );
            textFooterOrNot = <TextAreaFooter />;
        }

        return (
            <GridCardWrapper
                style={this.props.style}
                type={this.props.type}
                color={this.props.color}
                className={this.props.className}
                {...this.props}
            >
                <DeleteCardButton id={this.props.id} handleDeleteCard={this.props.handleDeleteCard} />
                {addImageOrNot}
                {addTextOrNot}
                {changeColorOrNot}
                <GridContent
                    id={this.props.id}
                    handleTextAreaChange={this.props.handleTextAreaChange}
                    textAreaValue={this.props.textAreaValue}
                    type={this.props.type}
                    url={this.props.url}
                    color={this.props.color}
                />
                {textFooterOrNot}
                {this.props.children} {/* for the resize handle */}
            </GridCardWrapper>
        );
    }
}

const GridCardWrapper = styled.div`
    font-family: "Bree Serif", serif;

    border-width: ${props => (props.type ? "0px" : "5px")};
    border-style: dotted;
    border-color: white;
    background-color: ${props => props.color};

    :hover {
        button {
            opacity: 0.5;
            transition: opacity 0.5s;
        }

        label {
            opacity: 0.5;
            transition: opacity 0.5s;
        }

        .react-resizable-handle {
            opacity: 1;
            transition: opacity 0.5s;
        }
        .text-area-footer {
            opacity: 0.2;
            transition: opacity 0.5s;
        }
        .text-area-color-swatch {
            opacity: 0.75;
            transition: opacity 0.5s;
        }
    }
`;

GridCard.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    textAreaValue: PropTypes.string,
    url: PropTypes.string
};

export default GridCard;
