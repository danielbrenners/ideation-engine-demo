import React, { Component } from "react";
import NotesBoard from "../components/NotesBoard";
import BoardTitle from "../components/BoardTitle";

class ProjectPage extends Component {
    render() {
        // handle null props (loading data from api)
        if (this.props.userData === undefined) {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            );
        }

        return (
            <div>
                <BoardTitle
                    userData={this.props.userData}
                    currentProject={this.props.currentProject}
                    currentBoard={this.props.currentBoard}
                    handleBoardNameChange={this.props.handleBoardNameChange}
                />
                <NotesBoard
                    userData={this.props.userData}
                    currentProject={this.props.currentProject}
                    currentBoard={this.props.currentBoard}
                    handleBoardNameChange={this.props.handleBoardNameChange}
                    handleDeleteCard={this.props.handleDeleteCard}
                    handleAddText={this.props.handleAddText}
                    handleLayoutChange={this.props.handleLayoutChange}
                    handleTextAreaChange={this.props.handleTextAreaChange}
                    handleColorSwatchChange={this.props.handleColorSwatchChange}
                    handleCardImageChange={this.props.handleCardImageChange}
                    handleAddCard={this.props.handleAddCard}
                />
            </div>
        );
    }
}

export default ProjectPage;
