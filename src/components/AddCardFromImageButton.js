import React, { Component } from "react";
import styled from "styled-components";
import { post } from "axios";
import { flaskAPI } from "../util/constants";
import AddCardFromImageLoading from "./AddCardFromImageLoading";
import uploadIcon from "../images/upload_white.svg";
import { color } from "../util/constants";

class AddCardFromImageButton extends Component {
    state = { isLoading: false };

    onChange = e => {
        let cardColor;

        this.setIsLoading();
        this.imageUpload(e.target.files[0]).then(response => {
            response.data.results.forEach(res => {
                if (res.color === "orange") {
                    cardColor = color.orange;
                } else if (res.color === "pink") {
                    cardColor = color.pink;
                } else if (res.color === "blue") {
                    cardColor = color.blue;
                } else if (res.color === "green") {
                    cardColor = color.green;
                } else if (res.color === "yellow") {
                    cardColor = color.yellow;
                } else {
                    cardColor = "white";
                }

                this.props.handleAddCard("text", res.text, cardColor, undefined);
            });
            this.setIsNotLoading();
        });
    };

    imageUpload(image) {
        const url = flaskAPI.cv_url;
        const formData = new FormData();
        formData.append("image", image);
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        return post(url, formData, config);
    }

    setIsLoading = () => {
        this.setState({ isLoading: true });
    };

    setIsNotLoading = () => {
        this.setState({ isLoading: false });
    };

    render() {
        let uploader;
        if (this.state.isLoading === false) {
            uploader = (
                <div>
                    <FileInput type="file" name="file" id="file" className="inputfile" onChange={this.onChange} />
                    <FileLabel htmlFor="file">
                        <UploadImage src={uploadIcon} />
                    </FileLabel>
                </div>
            );
        } else {
            uploader = <AddCardFromImageLoading />;
        }
        return <div>{uploader}</div>;
    }
}

const FileInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
`;

const FileLabel = styled.label`
    cursor: pointer;
    /*outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;*/

    position: relative;
    bottom: 0px;

    display: inline-block;
    width: 50px;
    height: 50px;

    background-color: #5596e6;
    color: #fff;

    padding: 2px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 10px 0px 10px 10px;
    border-radius: 50%;
`;

const UploadImage = styled.img`
    width: 25px;
    margin-top: 10px;
`;

export default AddCardFromImageButton;
