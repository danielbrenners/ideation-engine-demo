import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SignOut from "../../components/SignOut";
import SignIn from "../../components/SignIn";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = props => {
    let signInOrOut;
    if (props.currentUser) {
        signInOrOut = <SignOut />;
    } else {
        signInOrOut = <SignIn />;
    }

    let userName;
    if (props.currentUser) {
        userName = props.currentUser.displayName;
    }

    return (
        <div>
            <Wrapper>
                <Logo />
                {signInOrOut}
            </Wrapper>
            <Nav currentBoardName={props.currentBoardName} currentUserName={userName} currentUser={props.currentUser} />
        </div>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 65px;
    margin: 0px 0px 50px 0px;
    display: flex;
`;

Header.propTypes = {
    currentBoardName: PropTypes.string,
    currentUserName: PropTypes.string
};

export default Header;
