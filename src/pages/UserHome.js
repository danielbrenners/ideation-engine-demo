import React from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import styled from "styled-components";

const UserHome = props => {
    return (
        <Wrapper>
            <h1>Welcome {props.currentUser.displayName}</h1>

            <ProjectCardWrapper>
                <Link to="/workshop_session">
                    <ProjectCard projectTitle={"Workshop Session"} />
                </Link>
                <Link to="#">
                    <ProjectCard projectTitle={"Research Observations"} />
                </Link>
                <Link to="#">
                    <ProjectCard projectTitle={"Participant Interview"} />
                </Link>
            </ProjectCardWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    text-align: center;
    font-family: "Bree Serif", serif;
    padding-top: 100px;
`;

const ProjectCardWrapper = styled.div`
    max-width: 740px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;
export default UserHome;
