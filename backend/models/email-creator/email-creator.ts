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
      subject: "Welcome to Leadcoin Network",
      html:
        "<h2>Hello " +
        user.fname +
        "!</h2>" +
        "<p>Please click " +
        '<a href="' +
        this.backend +
        "/auth/confirm-email-update?key=" +
        token +
        '">' +
        "here " +
        "</a>" +
        "to confirm your registration" +
        "</p>",
    }
  }

  confirmEmailUpdate(user, token) {
    return {
      from: this.from,
      to: user.email,
      subject: "Email changed",
      html:
        "<h2>Hello " +
        user.fname +
        "!</h2>" +
        "<p>Please confirm your new email address " +
        '<a href="' +
        this.backend +
        "/auth/confirm-email-update?token=" +
        token +
        '">' +
        "here " +
        "</a>" +
        "</p>",
    }
  }

  forgotPassword(user, password) {
    return {
      to: user.email,
      from: this.from,
      subject: "New Password Issued",
      html:
        "<h2>Hello " +
        user.fname +
        "!</h2>" +
        "<p>Per your recent request we have issued a new temporary password for you. </br> " +
        "your new password: " +
        password +
        "</br>" +
        "<b> This password is temporary, please change it as soon as possible </b>" +
        "</p>",
    }
  }
}

export default EmailCreator
