import React, { Component } from "react";
import VisitorHome from "./VisitorHome";

import UserHome from "./UserHome";

class Home extends Component {
    render() {
        let homePage;
        if (this.props.currentUser) {
            homePage = <UserHome currentUser={this.props.currentUser} />;
        } else {
            homePage = <VisitorHome />;
        }

        return <div>{homePage}</div>;
    }
}
export default Home;
