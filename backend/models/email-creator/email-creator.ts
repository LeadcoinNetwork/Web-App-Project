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

  forgotPassword(user, token) {
    return {
      to: user.email,
      from: this.from,
      subject: "Reset Password",
      html:
        "<h2>Hello " +
        user.fname +
        "!</h2>" +
        "<p>Please click " +
        '<a href="' +
        this.backend +
        "/auth/reset-password?token=" +
        token +
        '">' +
        "here " +
        "</a>" +
        "to choose a new password" +
        "</p>",
    }
  }
}

export default EmailCreator
