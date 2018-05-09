import React from "react";
import styled from "styled-components";

const VisitorHome = () => {
    return (
        <Wrapper>
            <h1>Hello!</h1>
            <p>Sign in to access your boards.</p>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    font-family: "Bree Serif", serif;
    text-align: center;
    margin-top: 200px;
    h1 {
        font-size: 50px;
    }
`;
export default VisitorHome;
