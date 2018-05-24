import * as React from 'react'
import Button from '../leadcoin_ui/Button'
import axios from 'axios'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

interface ComponentProps {
  navigate: any
  token: string
}

interface StateProps {
  response: string | null
  currentStep: string
  errors?: any
  file?: any
  x?: number 
  file_field_list?: string[]
  db_field_list?: string[]
  field_map?: object
}

export class CsvUpload extends React.Component <ComponentProps> {
  state: StateProps = {
    response: null,
    currentStep: 'upload',
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
    axios.post('http://127.0.0.1.xip.io:3000/api/v1/csv/upload', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((response) => {
      const {data, db_field_list} = response.data
      const {x, field_list} = data
      this.setState({
        x, 
        file_field_list: field_list, 
        currentStep: 'fieldMap',
        db_field_list
      })
    })
    .catch((error) => {
      if (error.response) {
        // error originated from server
        if (error.response.data.error){
          const errors = error.response.data.error.split("; ")
          this.setState({errors: errors})
          setTimeout( () => {
            this.setState({errors: null})
          }, errors.length * 2250)
        }
      } else if (error.request) {
        // request made, no response though
      } else {
        // error was thrown during request setup
      }
    });
  }

  handleChange(e: any, value: any) {
    console.log(e, value)
  }

  listItems(fieldName: string) {
    const {field_map, file_field_list} = this.state
    let value = ''
    if (file_field_list) {
      if (field_map) {
        if (field_map[fieldName])
          value = field_map[fieldName]
      }
      const items = file_field_list.map( (field:string, i:number) => {
        return <MenuItem value={field} key={i}> {field} </MenuItem>
      })
      return <SelectField
        floatingLabelText="Choose"
        value={value}
        onChange={(e) => {
          this.handleChange(e, value)
         }}>
        <MenuItem value={0} key={-1}>I Don't have this field </MenuItem>
        {items}
        </SelectField>
    }
    return
  }

  fieldMapper() {
    const {db_field_list} = this.state
    let fields
    if (db_field_list)
      fields = db_field_list.map((f) => {
        return <div className="line flexed">
          <div className="fieldLabel">{f} </div>
          {this.listItems(f)}
        </div>
      })
    return (
      <div className="fields_mapper">
        <div className='header'>Map Columns in your CSV to Leads </div>
        <div className='header'>Personal Identification Information </div>
        <div className='header'>fields that will only be visible to who bought the lead</div>
        <div className='fields flexed'>
          <div>
            {fields}
          </div>
        </div>
        <div className='price'>
          <span>Lead price </span>
        </div>
        <div className='submit flexed'>
          <div>
            Checkbox
          </div>
          <div>
            Submit Button
          </div>
        </div>
      </div>
    )
  }

  generalError() {
    const {errors} = this.state
    if (errors && errors.length > 0) {
      const errorMsgs = errors.map((e: any,i: number) => {return (<div key={i}>{e}</div>)})
      return (
        <div className='error'>
          {errorMsgs}
        </div>
      )
    }
    return
  }

  file_upload() {
    const fileLabel = (this.state.file) ? this.state.file.name : 'Choose File'
    return (
      <div className="csvUpload">
        <div className="file_pick">
          <div>
            <Button
              containerElement='label'
              label ={fileLabel}>
              <input
                className="displaynone"
                type="file"
                onChange={this.pickFile}
                />
            </Button>
            </div>
        </div>
        {this.generalError()}
        <div className="submit">
          <Button
            onClick={ ()=> {this.submit()}}
            containerElement='label'
            label ='Submit' />
        </div>
      </div>
    );
  }

  nextStep() {

  }

  prevStep() {

  }

  render() {
    const {currentStep} = this.state
    let currentComponent = this.file_upload()
    switch (currentStep) {
      case "fieldMap":
        currentComponent = this.fieldMapper()
    }
    return (
      <div>
        {currentComponent}
      <div className="flexed">
        <Button onClick={ ()=> {this.submit()}} label ='&lt;' />
        <Button onClick={ ()=> {this.submit()}} label ='&gt;' />
      </div>
      </div>
    )
  }
}
