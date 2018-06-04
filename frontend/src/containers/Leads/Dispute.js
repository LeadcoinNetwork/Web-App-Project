import React from "react";
import { connect } from "react-redux";

class Dispute extends React.Component {
  render() {
    return <h1>Dispute lead {this.props.match.params.id}</h1>;
  }
}

export default connect()(Dispute);
