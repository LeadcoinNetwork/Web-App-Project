import React from 'react'
import Button from '../leadcoin_ui/Button'
import TextField from '../leadcoin_ui/TextField'
import axios from 'axios'

class UserDetails extends React.Component {
  state = {
    company: '',
    country: '',
    phone: '',
    errors: []
  }
  
  handleChange = name => {
    return event => {
      this.setState({ [name]: event.target.value });
    };
  }
  
  submitDetails = () => {
    const { company, country, phone } = this.state
    const { user, token } = this.props
    console.log('updating', { company, country, phone, token })
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.put('http://localhost:3000/api/v1/user/' + user.id, {
      company, country, phone
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      if (error.response) {
        // error originated from server
        if (error.response.data.error) {
          let errors = error.response.data.error.split("; ")
          this.setState({ errors: errors })
        }
      } else if (error.request) {
        // request made, no response though
      } else {
        // error was thrown during request setup
      }
    });
  }
  
  generalError() {
    const { errors } = this.state
    if (errors.length > 0) {
      const errorMsgs = errors.map((e, i) => { return (<div key={i}>{e}</div>) })
      return (
        <div className='error'>
          {errorMsgs}
        </div>
      )
    }
    return
  }
  
  
  render() {
    return (
      <div className="emailConfirm">
        <div>
          Please complete your sign-up by filling these details:
        </div>
        <div>
          <TextField
            label="Company Name"
            value={this.state.company}
            onChange={this.handleChange('company')}
            type="text"
            />
        </div>
        <div>
          <TextField
            label="Country"
            value={this.state.country}
            onChange={this.handleChange('country')}
            type="text"
            />
        </div>
        <div>
          <TextField
            label="Phone"
            value={this.state.phone}
            onChange={this.handleChange('phone')}
            type="text"
            />
        </div>
        {this.generalError()}
        <div className="submitDetails">
          <div> <Button onClick={this.submitDetails}> Complete Sign-Up </Button> </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;