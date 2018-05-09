import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Nav = props => {
    if (props.currentUser) {
        return (
            <NavWrapper>
                {props.currentUserName} > Boards {props.currentBoardName ? "> " + props.currentBoardName : ""}
            </NavWrapper>
        );
    } else {
        return null;
    }
};

const NavWrapper = styled.div`
    color: #999;
    margin-left: 106px;
`;

Nav.propTypes = {
    currentBoardName: PropTypes.string,
    currentUserName: PropTypes.string
};

export default Nav;
