import * as React from "react";
import "./App.css";

const logo = require("./logo.svg");

export interface Props {
  name: string;
  city?: string;
}

class App extends React.Component<Props, object> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LeadCoin</h1>
        </header>
        <p className="App-intro">
          Here you see an example of using props. required props:
          <b>{this.props.name}</b>
          <br />
          Optional Props: {this.props.city}
        </p>
      </div>
    );
  }
}

export default App;
