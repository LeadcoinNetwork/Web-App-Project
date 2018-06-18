class Email {
  constructor({ mailSender, backend, from }) {
    this.mailSender = mailSender
    this.backend = backend
    this.from = from
  }
  confirmEmail(user, token) {
    return this.mailSender.send({
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
        "/auth/confirm-email?token=" +
        token +
        '">' +
        "here " +
        "</a>" +
        "to confirm your registration" +
        "</p>",
    })
  }

  confirmEmailUpdate(user, token) {
    return this.mailSender.send({
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
    })
  }

  forgotPassword(user, token) {
    return this.mailSender.send({
      to: user.email,
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
    })
  }
}

module.exports = Email
