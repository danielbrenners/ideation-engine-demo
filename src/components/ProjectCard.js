import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class ProjectCard extends Component {
    render() {
        return (
            <Wrapper>
                <span>{this.props.projectTitle}</span>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    font-family: "Bree Serif", serif;
    width: 250px;
    height: 150px;
    background-color: #ddd;
    text-align: center;
    color: #222;
    font-size: 20px;
    padding: 50px;
    margin: 10px;
    flex: 1 1 0px;
    display: inline-block;
    border-radius: 5px;
`;

ProjectCard.propTypes = {
    projectTitle: PropTypes.string
};

export default ProjectCard;
