import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"
import NotFound from "../utils/not-found"
import { disabledReason } from "../models/users/types"

var {
  request,
  emailSenderMock,
  appLogic,
} = RoutesForTests.create()

test("resend email endpoint does send email and with correct link", async () => {
  const {users} = appLogic.models
  const { user, token } = await ValidatedUserForTests.create({users})
  const res = await request
    .get("/auth/resend-email")
    .set({cookie: "token=" + token})
    .send()
  var _user = await users.tryGetUserById(user.id)
  let key = _user.emailConfirmationKey
  let emailHTML = emailSenderMock.lastCall().html
  expect(emailHTML).toMatch("https://testbackend")
  expect(emailHTML).toMatch("/auth/confirm-email-update?key=" + key)
})