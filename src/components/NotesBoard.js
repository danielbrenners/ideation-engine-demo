import React, { Component } from "react";
import PropTypes from "prop-types";
import GridLayout from "../components/GridLayout";
import AddCardButton from "../components/AddCardButton";
import AddCardFromImageButton from "../components/AddCardFromImageButton";

class NotesBoard extends Component {
    render() {
        return (
            <div>
                <GridLayout
                    userData={this.props.userData}
                    currentProject={this.props.currentProject}
                    currentBoard={this.props.currentBoard}
                    handleDeleteCard={this.props.handleDeleteCard}
                    handleAddText={this.props.handleAddText}
                    handleLayoutChange={this.props.handleLayoutChange}
                    handleTextAreaChange={this.props.handleTextAreaChange}
                    handleColorSwatchChange={this.props.handleColorSwatchChange}
                    handleCardImageChange={this.props.handleCardImageChange}
                />
                <AddCardButton handleAddCard={this.props.handleAddCard} />
                <AddCardFromImageButton handleAddCard={this.props.handleAddCard} />
            </div>
        );
    }
}

NotesBoard.propTypes = {
    currentProject: PropTypes.string,
    currentBoard: PropTypes.string
};

export default NotesBoard;
