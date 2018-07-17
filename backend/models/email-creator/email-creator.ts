type urlInclueProtocol = string
type fromIncludeEmail = string

class EmailCreator {
  backend: urlInclueProtocol
  from: fromIncludeEmail

  constructor({
    backend,
    from,
  }: {
    backend: urlInclueProtocol
    from: fromIncludeEmail
  }) {
    this.backend = backend
    this.from = from
  }
  confirmEmail(user, token) {
    return {
      to: user.email,
      from: this.from,
      subject: "Welcome to the Leadcoin Network!",
      html:
        "Hello " +
        user.fname +
        ",<br>" +
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
    }
  }

  confirmEmailUpdate(user, token) {
    return {
      from: this.from,
      to: user.email,
      subject: "You Updated your Email Address",
      html:
        "Hello " +
        user.fname +
        ",<br>" +
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
    }
  }

  forgotPassword(user, password) {
    return {
      to: user.email,
      from: this.from,
      subject: "Reset Your Password",
      html:
        "Hello " +
        user.fname +
        ",<br>" +
        "We see that you forgot your password, and we’re happy to help you reset it. We’ve issued you a temporary password that will be valid for 24 hours.<br> " +
        "Temporary password: " +
        password +
        "<br><br>" +
        "This password is temporary, so please " +
        '<a href="' +
        this.backend +
        "/login" +
        '">' +
        "login" +
        "</a> and immediately change it.<br><br> " +
        "Best Regards,<br><br>" +
        "The LeadCoin Team",
    }
  }
}

export default EmailCreator
