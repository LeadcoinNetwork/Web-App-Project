import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"
import NotFound from "../utils/not-found"
import { disabledReason } from "../models/users/types"
import * as auth from "../models/user-auth/user-auth"
var { request, emailSenderMock, appLogic } = RoutesForTests.create()

test.skip("forgot password sends email with the new password", async () => {
  const { users } = appLogic.models
  const { user, token } = await ValidatedUserForTests.create({ users })
  const res = await request.post("/auth/forgot-password").send({
    email: user.email,
  })
  expect(res.error).toBeFalsy()
  var _user = await users.getOne({ id: user.id })
  if (_user instanceof NotFound) {
    // wtf happened?
    throw new Error("user is error")
  } else {
    const { password } = _user
    let password_finding_regex = /password:\s+(.*)<\/br>/
    let emailHTML = emailSenderMock.lastCall().html
    let password_matches = emailHTML.match(password_finding_regex)

    const hashed_password = auth.hashPassword(password)
    expect(emailHTML).toMatch(hashed_password)
  }
})

test("resend email endpoint does send email and with correct link", async () => {
  const { users } = appLogic.models
  const { user, token } = await ValidatedUserForTests.create({ users })
  const res = await request
    .get("/auth/resend-email")
    .set({ cookie: "token=" + token })
    .send()
  var _user = await users.tryGetById(user.id)
  let key = _user.emailConfirmationKey
  let emailHTML = emailSenderMock.lastCall().html
  expect(emailHTML).toMatch("https://testbackend")
  expect(emailHTML).toMatch("/auth/confirm-email-update?key=" + key)
})
