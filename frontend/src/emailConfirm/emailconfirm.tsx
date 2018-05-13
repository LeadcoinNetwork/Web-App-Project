import * as React from 'react'
import Button from 'material-ui/Button'

export class EmailConfirm extends React.Component {
  render() {
    return (
      <div className="emailConfirm">
        <div> We sent you an email.</div>
        <div> Please click on the link </div>
        <div className="resend_button">
          <div> <Button variant="raised" color="primary"> Resend </Button> </div>
        </div>
      </div>
    );
  }
}
