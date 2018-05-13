import * as React from 'react'
import './App.css'
import { LoginForm } from './loginForm/LoginForm'
import { SignupForm } from './signupForm/signupForm'
import { UserDetails } from './userDetails/userDetails'

const logo = require('./logo.svg');

export interface Props {
  name: string;
  city?: string;
}

interface stateProps {
  currentPage: string
}

class App extends React.Component<Props, object> {
  state: stateProps = {
    currentPage: '',
  }
  navigate(route: string) {
    this.setState({
      currentPage: route 
    })
  }

  render() {
    let currentComponent = <LoginForm navigate={this.navigate.bind(this)} />
    const {currentPage} = this.state
    const header = (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to LeadCoin</h1>
      </header>
    )
    if (currentPage === 'userDetails')
      currentComponent = <UserDetails />
    if (currentPage === 'signup')
      currentComponent = <SignupForm />
    return (
      <div className="App">
        {header}
        {currentComponent}
      </div>
    );
  }
}

export default App;
