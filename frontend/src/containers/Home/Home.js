import React from "react";
import { Redirect } from "react-router";

class Home extends React.Component {
  render() {
    // return <div>Hi{typeof Redirect}</div> //
    return <Redirect to="/users/signup" />;
  }
}

export default Home;
