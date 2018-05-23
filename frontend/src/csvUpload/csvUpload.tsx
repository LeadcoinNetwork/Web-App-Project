import * as React from 'react'
import Button from '../leadcoin_ui/Button'
import axios from 'axios'

interface ComponentProps {
  navigate: any
  token: string
}

interface StateProps {
  response: string | null
  errors?: any
  file?: any
}

export class CsvUpload extends React.Component <ComponentProps> {
  state: StateProps = {
    response: null
  }

  pickFile = (e: any) => {
    this.setState({
      file: e.target.files[0]
    })
  }

  submit() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.token
    const {file} = this.state
    const formData = new FormData()
    formData.append('file',file)
    axios.post('http://localhost:3000/api/v1/csv/upload', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response)
      this.setState({response: "Email Sent!"})
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

  render() {
    const {file} = this.state
    console.log(file)
    return (
      <div className="emailConfirm">
        <div className="resend_button">
          <div> 
            <Button 
              containerElement='label'
              label ='Upload' > 
              <input 
                className="displaynone" 
                type="file" 
                onChange={this.pickFile}
                />
            </Button>
            </div>
        </div>
        <div className="response">
            <Button 
              onClick={ ()=> {this.submit()}}
              containerElement='label'
              label ='Upload' /> 
        </div>
      </div>
    );
  }
}
