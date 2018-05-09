import React, { Component } from "react";
import { auth, googleAuthProvider } from "../util/firebase";
import styled from "styled-components";

class SignIn extends Component {
    render() {
        return (
            <div>
                <Button
                    onClick={() => {
                        auth.signInWithPopup(googleAuthProvider);
                    }}
                >
                    Sign In
                </Button>
            </div>
        );
    }
}

const Button = styled.button`
    display: inline-block;
    width: 90px;
    height: 50px;

    background-color: #f0f0f0;
    color: #000;
    border: none;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    display: inline-block;
    position: absolute;
    right: 100px;
    top: 15px;
`;

export default SignIn;
