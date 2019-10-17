type urlInclueProtocol = string
type urlFrontend = string
type fromIncludeEmail = string

class EmailCreator {
  backend: urlInclueProtocol
  frontend: urlFrontend
  from: fromIncludeEmail

  constructor({
    backend,
    frontend,
    from,
  }: {
    backend: urlInclueProtocol
    frontend: urlFrontend
    from: fromIncludeEmail
  }) {
    this.backend = backend
    this.frontend = frontend
    this.from = from
  }
  confirmEmail(user, token) {
    return {
      to: user.email,
      from: this.from,
      subject: "Welcome to the Leadcoin Network!",
      html: this.createLetter(
        "Confirm Email",
        "Hello " +
          user.fname +
          ",<br><br>" +
          "Thanks for becoming part of LeadCoin, the future of web marketing. Before you can start buying and selling leads on the network you’ll need to activate your account.<br><br>" +
          "Please " +
          '<a href="' +
          this.backend +
          "/auth/confirm-email-update?key=" +
          token +
          '">' +
          "click here " +
          "</a>" +
          "to confirm your registration<br><br>" +
          "Best Regards,<br><br>" +
          "The LeadCoin Team",
      ),
    }
  }

  confirmEmailUpdate(user, token) {
    return {
      from: this.from,
      to: user.email,
      subject: "You Updated your Email Address",
      html: this.createLetter(
        "Email Address Update",
        "Hello " +
          user.fname +
          ",<br><br>" +
          "We see that you just updated the email address that you have registered in the system. In order to complete the update you’ll need to authorize the change.<br><br>" +
          "Please confirm your new email address " +
          '<a href="' +
          this.backend +
          "/auth/confirm-email-update?token=" +
          token +
          '">' +
          "here" +
          "</a><br><br>" +
          "Best Regards,<br><br>" +
          "The LeadCoin Team",
      ),
    }
  }

  forgotPassword(user, password) {
    return {
      to: user.email,
      from: this.from,
      subject: "Reset Your Password",
      html: this.createLetter(
        "Reset Password",
        "Hello " +
          user.fname +
          ",<br><br>" +
          "We see that you forgot your password, and we’re happy to help you reset it. We’ve issued you a temporary password that will be valid for 24 hours.<br><br> " +
          "Temporary password: " +
          password +
          "<br><br>" +
          "Best Regards,<br><br>" +
          "The LeadCoin Team",
      ),
    }
  }

  resetPassword(user) {
    return {
      to: user.email,
      from: this.from,
      subject: "Your password has been changed",
      html: this.createLetter(
        "Reset Password",
        "Hello " +
          user.fname +
          ",<br><br>" +
          "Your password was successfully changed.<br><br>" +
          "Best Regards,<br><br>" +
          "The LeadCoin Team",
      ),
    }
  }

  private createLetter(title, content) {
    const html =
      "<!DOCTYPE html>" +
      "<body style='margin: 0; padding: 0;'>" +
      "<table align='center' border='0' cellpadding='0' cellspacing='0' width='100%' style='margin:0; padding:0'>" +
      "    <tr>" +
      "        <td align='center'>" +
      "            <table bgcolor='#180852' align='center' border='0' cellpadding='0' cellspacing='0' width='600px' style='margin:0; padding:0'>" +
      "                <tr>" +
      "                    <td width='120' " +
      "                        style='font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; padding-top: 17px; padding-right: 17px; padding-bottom: 17px; padding-left: 17px;'>" +
      `                        <a href='${
        this.frontend
      }' title='leadcoin.network'><img` +
      `                                src='${
        this.frontend
      }/images/logo.png' alt='LEAD COIN' width='120'` +
      "                                style='display: block; color: #ffffff'></a>" +
      "                    </td>" +
      "                    <td align='right'" +
      "                        style='color: #ffffff; font-family: Arial, sans-serif; font-size: 18px; line-height: 20px; padding-top: 17px; padding-right: 40px; padding-bottom: 17px; padding-left: 23px;'>" +
      title +
      "                    </td>" +
      "                </tr>" +
      "            </table>" +
      "        </td>" +
      "    </tr>" +
      "    <tr>" +
      "        <td align='center'>" +
      "              <table align='center' cellpadding='0' cellspacing='0' width='600px' style='margin:0; padding:0; border:#4c389b 30px solid;'>" +
      "                   <tr>" +
      "                     <td" +
      "                        style='color: #180852 !important; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; padding-top: 30px; padding-right: 25px; padding-bottom: 30px; padding-left: 25px;'>" +
      content +
      "                     </td>" +
      "                   </tr>" +
      "              </table>" +
      "        </td>" +
      "    </tr>" +
      "</table>" +
      `<span style='display:none !important;font-size:1px;color:#333333;line-height:1px;
                                                height:0px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;
                                                visibility:hidden;'> ${new Date()} </span>` +
      "</body>"
    return html
  }
}

export default EmailCreator
