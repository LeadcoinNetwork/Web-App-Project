import * as React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

interface StateProps {
  company_name: string
  country: string
  phone: string
}

export class UserDetails extends React.Component {
  state:StateProps = {
    company_name: '',
    country: '',
    phone: ''
  }

  handleChange = (name:string) => {
    return (event:any) => {
      this.setState({ [name]: event.target.value });
    };
  } 

  render() {
    return (
      <div className="emailConfirm">
        <div>
          <TextField
            id="company"
            label="Company Name"
            className="company_nameField"
            value={this.state.company_name}
            onChange={this.handleChange('company_name')}
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
        <div className="submitDetails">
          <div> <Button variant="raised" color="primary"> Complete Sign-Up </Button> </div>
        </div>
      </div>
    );
  }
}
