import React from "react";
import styled from "styled-components";
import BoardSVG from "../../images/board-logo.svg";

const Logo = props => {
    return (
        <div>
            <LogoWrapper src={BoardSVG} />
        </div>
    );
};

const LogoWrapper = styled.img`
    display: inline-block;
    width: 60px;
    height: 60px;
    margin: 25px 25px 25px 102px;
`;

export default Logo;
