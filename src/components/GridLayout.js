import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactGridLayout from "react-grid-layout";
import styled from "styled-components";
import { gridShape } from "../util/constants";

import GridCard from "./GridCard";

class GridLayout extends Component {
  render() {
    // grab the current board card
    let cards = this.props.userData["projects"][this.props.currentProject]["boards"][this.props.currentBoard].cards;

    // create the layout from props
    let layout = [];

    Object.keys(cards).forEach(id => {
      layout.push({
        x: cards[id].layout.x,
        y: cards[id].layout.y,
        w: cards[id].layout.w,
        h: cards[id].layout.h,
        i: cards[id].layout.i
      });
    });

    // create an array of formatted GridItems
    let gridCards = [];

    Object.keys(cards).forEach(id => {
      // conditionally add the text button if new item

      gridCards.push(
        // construct the card
        <GridCard
          type={cards[id].type}
          handleAddText={this.props.handleAddText}
          color={cards[id].color}
          className="widget-number"
          key={id}
          id={id}
          handleDeleteCard={this.props.handleDeleteCard}
          handleTextAreaChange={this.props.handleTextAreaChange}
          textAreaValue={cards[id].text}
          url={cards[id].url}
          handleColorSwatchChange={this.props.handleColorSwatchChange}
          handleCardImageChange={this.props.handleCardImageChange}
        />
      );
    });

    return (
      <GridWrapper>
        <ReactGridLayout
          draggableCancel="input, textarea"
          className="layout"
          layout={layout}
          cols={gridShape.gridCols}
          rowHeight={200}
          width={1200}
          onLayoutChange={this.props.handleLayoutChange}
        >
          {gridCards}
        </ReactGridLayout>
      </GridWrapper>
    );
  }
}

const GridWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: black;
  border-radius: 5px;
`;

GridLayout.propTypes = {
  currentProject: PropTypes.string,
  currentBoard: PropTypes.string
};

export default GridLayout;
