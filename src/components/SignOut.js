import React, { Component } from "react";
import { auth } from "../util/firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";

class SignOut extends Component {
    render() {
        return (
            <div>
                <Link to="/">
                    <Button
                        onClick={() => {
                            auth.signOut();
                        }}
                    >
                        Sign Out
                    </Button>
                </Link>
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

export default SignOut;
