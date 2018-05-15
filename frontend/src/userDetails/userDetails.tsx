import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'

interface StateProps {
  company: string
  country: string
  phone: string
  errors: string[]
}

interface ComponentProps {
  token: string
  user: any
}

export class UserDetails extends React.Component <ComponentProps> {
  state:StateProps = {
    company: '',
    country: '',
    phone: '',
    errors: []
  }

  handleChange = (name:string) => {
    return (event:any) => {
      this.setState({ [name]: event.target.value });
    };
  } 

  submitDetails() {
    const {company, country, phone} = this.state
    const {user, token} = this.props
    console.log('updating',{company, country, phone, token} )
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.put('http://localhost:3000/api/v1/user/'+user.id, {
      company, country, phone
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      if (error.response) {
        // error originated from server
        if (error.response.data.error){
          let errors = error.response.data.error.split("; ")
          this.setState({errors: errors})
        }
      } else if (error.request) {
        // request made, no response though
      } else {
        // error was thrown during request setup
      }
    });
  }

  generalError() {
    const {errors} = this.state
    if (errors.length > 0) {
      const errorMsgs = errors.map((e,i) => {return (<div key={i}>{e}</div>)})
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
            id="company"
            label="Company Name"
            className="companyField"
            value={this.state.company}
            onChange={this.handleChange('company')}
            type="text"
            margin="normal" 
            />
        </div>
        <div>
          <TextField
            id="country"
            label="Country"
            className="countryField"
            value={this.state.country}
            onChange={this.handleChange('country')}
            type="text"
            margin="normal" 
            />
        </div>
        <div>
          <TextField
            id="phone"
            label="Phone"
            className="phoneField"
            value={this.state.phone}
            onChange={this.handleChange('phone')}
            type="text"
            margin="normal" 
            />
        </div>
        {this.generalError()}
        <div className="submitDetails">
          <div> <RaisedButton onClick={this.submitDetails.bind(this)} variant="raised" color="primary"> Complete Sign-Up </RaisedButton> </div>
        </div>
      </div>
    );
  }
}
