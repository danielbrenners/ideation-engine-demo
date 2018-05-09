import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { auth } from "./util/firebase";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import UserData from "./data/userData.json";
import { color, gridShape } from "./util/constants";
import Header from "./components/Header";

import "./App.css";

class App extends Component {
  state = {
    currentUser: undefined,
    userData: UserData["userData"],
    currentProject: "project_A",
    currentBoard: "b4"
  };

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
    });
  }

  handleLayoutChange = newLayout => {
    // get a copy of the current board
    let currentBoard = this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard];
    // loop through the current board's cards
    Object.keys(currentBoard.cards).forEach(key => {
      // loop over the new layout aray
      newLayout.forEach(newLayoutItem => {
        // if the current board's iterated cards have the same i as the array
        if (currentBoard.cards[key].layout.i === newLayoutItem.i) {
          // update the object with this arrays information
          currentBoard.cards[key].layout = newLayoutItem;
        }
      });
    });
    // get a copy of the entire user data
    let newUserData = this.state.userData;
    // refresh user data with altered board data
    newUserData["projects"][this.state.currentProject]["boards"][this.state.currentBoard] = currentBoard;
    // set the new state
    this.setState({
      userData: newUserData
    });
  };

  getLayoutMask() {
    let currentBoard = this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard];
    let x, y, w, h;

    let mask = [];

    for (let i = 0; i < gridShape.maxBoardHeight; i++) {
      mask.push([0, 0, 0, 0, 0, 0]);
    }

    Object.keys(currentBoard.cards).forEach(key => {
      x = currentBoard.cards[key].layout.x;
      y = currentBoard.cards[key].layout.y;
      w = currentBoard.cards[key].layout.w;
      h = currentBoard.cards[key].layout.h;

      for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
          mask[y + j][x + i] = 1;
        }
      }
    });

    return mask;
  }

  getFirstEmptyLocation(mask) {
    let x_pos = 0;
    let y_pos = 0;

    for (let j = 0; j < mask.length; j++) {
      for (let i = 0; i < mask[0].length; i++) {
        if (mask[j][i] === 0) {
          x_pos = i;
          y_pos = j;
          return [x_pos, y_pos];
        }
      }
    }
  }

  handleAddCard = (type, text, cardColor, url) => {
    // the idea is to take the current board, alter it
    // then make a copy of the entire user data and
    // add the new data. then set the new state
    // of the entire user data

    // get a copy of the current board
    let currentBoard = this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard];

    // first check to see if exceeding maximum number of cards
    const numCards = Object.keys(currentBoard.cards).length;
    if (numCards < gridShape.maxBoardHeight * gridShape.gridCols) {
      // create an id based on the number of cards
      // determine number of cards
      let uniqueID = "c" + currentBoard["cardCounter"];
      currentBoard["cardCounter"] += 1;

      // get layout mask and find where to place new card
      const layoutMask = this.getLayoutMask();
      const xy = this.getFirstEmptyLocation(layoutMask);

      // add new card
      currentBoard.cards[uniqueID] = {
        type: type,
        text: text,
        color: cardColor,
        url: url,
        layout: {
          x: xy[0],
          y: xy[1],
          w: 2,
          h: 1,
          i: uniqueID
        }
      };

      // get a copy of the entire user data
      let newUserData = this.state.userData;
      // refresh user data with altered board data
      newUserData["projects"][this.state.currentProject]["boards"][this.state.currentBoard] = currentBoard;

      // set the new state
      this.setState({
        userData: newUserData
      });
    }
  };

  handleDeleteCard = id => {
    // get a copy of the current boards state
    let currentBoard = this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard];

    // loop through the current board's cards
    Object.keys(currentBoard.cards).forEach(key => {
      if (key === id) {
        delete currentBoard.cards[key];
      }
    });

    // get a copy of the entire user data
    let newUserData = this.state.userData;
    // refresh user data with altered board data
    newUserData["projects"][this.state.currentProject]["boards"][this.state.currentBoard] = currentBoard;

    // set the new state
    this.setState({
      userData: newUserData
    });
  };

  handleAddText = id => {
    // get a copy of the current boards state
    let currentBoard = this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard];

    const colors = [color.orange, color.pink, color.blue, color.green, color.yellow];
    // change type to text
    currentBoard.cards[id].type = "text";
    // change text to a placeholder
    currentBoard.cards[id].text = "...";
    // pick random color
    currentBoard.cards[id].color = colors[Math.floor(Math.random() * colors.length)];

    // get a copy of the entire user data
    let newUserData = this.state.userData;
    // refresh user data with altered board data
    newUserData["projects"][this.state.currentProject]["boards"][this.state.currentBoard] = currentBoard;

    // set the new state
    this.setState({
      userData: newUserData
    });
  };

  handleTextAreaChange = (i, event) => {
    // get a copy of the current boards state
    let currentBoard = this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard];

    currentBoard.cards[i].text = event.target.value;

    // get a copy of the entire user data
    let newUserData = this.state.userData;
    // refresh user data with altered board data
    newUserData["projects"][this.state.currentProject]["boards"][this.state.currentBoard] = currentBoard;

    // set the new state
    this.setState({
      userData: newUserData
    });
  };

  handleColorSwatchChange = (i, color, event) => {
    // get a copy of the current boards state
    let currentBoard = this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard];

    currentBoard.cards[i].color = color;

    // get a copy of the entire user data
    let newUserData = this.state.userData;
    // refresh user data with altered board data
    newUserData["projects"][this.state.currentProject]["boards"][this.state.currentBoard] = currentBoard;

    // set the new state
    this.setState({
      userData: newUserData
    });
  };

  handleAddBoard = () => {
    // get a copy of the entire user data
    let newUserData = this.state.userData;

    // check that the number of boards does
    // not exceed the max
    let numBoards = Object.keys(newUserData["projects"][this.state.currentProject]["boards"]).length;

    if (numBoards < gridShape.maxNumBoards) {
      // get the current board counter
      let boardCounter = newUserData["projects"][this.state.currentProject]["boardCounter"];

      // refresh user data with altered board data
      newUserData["projects"][this.state.currentProject]["boards"]["b" + String(boardCounter)] = {
        name: "Untitled",
        cards: {},
        cardCounter: 0
      };

      newUserData["projects"][this.state.currentProject]["boardCounter"] += 1;
      // set the new state
      this.setState({
        userData: newUserData
      });
    }
  };

  handleDeleteBoard = () => {
    // get a copy of the entire user data
    let newUserData = this.state.userData;

    // if more than one board
    if (Object.keys(newUserData["projects"][this.state.currentProject]["boards"]).length > 1) {
      // delete the board
      delete newUserData["projects"][this.state.currentProject]["boards"][this.state.currentBoard];

      // find the new current board
      let newCurrentBoard = Object.keys(newUserData["projects"][this.state.currentProject]["boards"])[0];

      // set the new state
      this.setState({
        userData: newUserData,
        currentBoard: newCurrentBoard
      });
    }
  };

  handleBoardNameChange = event => {
    // get a copy of the current boards state
    let currentBoard = this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard];

    currentBoard.name = event.target.value;

    // get a copy of the entire user data
    let newUserData = this.state.userData;
    // refresh user data with altered board data
    newUserData["projects"][this.state.currentProject]["boards"][this.state.currentBoard] = currentBoard;

    // set the new state
    this.setState({
      userData: newUserData
    });
  };

  handleCardImageChange = (id, url) => {
    // get a copy of the current card
    let currentCard = this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard][
      "cards"
    ][id];

    currentCard["type"] = "image";
    currentCard["url"] = url;

    // get a copy of the entire user data
    let newUserData = this.state.userData;
    // refresh user data with altered board data
    newUserData["projects"][this.state.currentProject]["boards"][this.state.currentBoard]["cards"][id] = currentCard;

    // set the new state
    this.setState({
      userData: newUserData
    });
  };

  handleBoardModeChange = mode => {
    this.setState({ boardMode: mode });
  };

  handleUpdateUserData = newUserData => {
    this.setState({ userData: newUserData });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/"
              component={props => (
                <div>
                  <Header currentUser={this.state.currentUser} />
                  <Home currentUser={this.state.currentUser} />
                </div>
              )}
            />

            <Route
              path="/workshop_session/"
              render={() => (
                <div>
                  <Header
                    currentUser={this.state.currentUser}
                    currentBoardName={
                      this.state.userData["projects"][this.state.currentProject]["boards"][this.state.currentBoard].name
                    }
                  />
                  <ProjectPage
                    userData={this.state.userData}
                    currentProject={this.state.currentProject}
                    currentBoard={this.state.currentBoard}
                    boardMode={this.state.boardMode}
                    handleAddBoard={this.handleAddBoard}
                    handleDeleteBoard={this.handleDeleteBoard}
                    handleAddCard={this.handleAddCard}
                    handleDeleteCard={this.handleDeleteCard}
                    handleAddText={this.handleAddText}
                    handleBoardNameChange={this.handleBoardNameChange}
                    handleLayoutChange={this.handleLayoutChange}
                    handleTextAreaChange={this.handleTextAreaChange}
                    handleColorSwatchChange={this.handleColorSwatchChange}
                    handleCardImageChange={this.handleCardImageChange}
                    handleUpdateUserData={this.handleUpdateUserData}
                  />
                </div>
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
