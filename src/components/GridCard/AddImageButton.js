import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { post } from "axios";
import ImageSVG from "../../images/image.svg";

const cloudName = "ddcr8yeds";
const unsignedUploadPreset = "tnd74x3b";

class AddImageButton extends Component {
    onChange = e => {
        console.log("uploading");

        let self = this;

        this.imageUpload(e.target.files[0])
            .then(function(res) {
                // console.log('res', res)
                // File uploaded successfully
                let response = res.data;
                // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                let url = response.secure_url;
                console.log(url);
                //let alt = response.public_id;

                self.props.handleCardImageChange.bind(self, self.props.id, url)();
            })
            .catch(function(err) {
                console.error("err", err);
            });
    };

    imageUpload(image) {
        let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        let fd = new FormData();
        fd.append("upload_preset", unsignedUploadPreset);
        fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
        fd.append("file", image);
        const config = {
            headers: { "X-Requested-With": "XMLHttpRequest" },
            onUploadProgress: function(progressEvent) {}
        };

        return post(url, fd, config);
    }

    render() {
        return (
            <div>
                <FileInput type="file" name="file" id="cardImage" className="inputfile" onChange={this.onChange} />
                <FileLabel htmlFor="cardImage">
                    <img src={ImageSVG} alt="Add" />
                </FileLabel>
            </div>
        );
    }
}

const FileInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    z-index: -1;
    position: absolute;
`;

const FileLabel = styled.label`
    cursor: pointer;
    outline: 1px dotted #000;

    position: absolute;
    z-index: 100;
    display: inline-block;
    width: 25px;
    height: 25px;

    right: 30px;

    background-color: #fff;
    color: #000;
    border: none;

    padding: 2px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;

    opacity: 0;
    border-radius: 3px;
`;

AddImageButton.propTypes = {
    id: PropTypes.string
};

export default AddImageButton;
