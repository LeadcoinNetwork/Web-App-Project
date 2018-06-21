import * as Chance from "chance"
import * as _ from "lodash"
import UserActions from "../../../../models/user-actions/user-actions"

import EmailCreator from "../../../../models/email-creator/email-creator"
import EmailSenderMock from "../../../../models/emailsender/mock"

var userActions = new UserActions({
  emailCreator: new EmailCreator({ backend: "", from: "" }),
  emailSender: new EmailSenderMock(),
})

var chance = Chance()

import { ExistingUserInterface } from "../../../../models/user-types/user-types"
export async function create({ request }): Promise<ExistingUserInterface> {
  var x = await request.post("/user").send({
    fname: "moshe",
    lname: "moshe",
    password: "KGHasdF987654&*^%$#",
    email: chance.email(),
  })
  expect(_.get(x, "error.text")).toBeFalsy()
  var tokenFromBody = x.body.token
  x = await request.get("/me").set({
    cookie: "token=" + tokenFromBody,
  })
  expect(_.get(x, "error.text")).toBeFalsy()
  expect(_.get(x, "body.user.id")).toBeTruthy()
  await userActions.activateUser({ user_id: x.body.user.id })
  x = await request.get("/me").set({
    cookie: "token=" + tokenFromBody,
  })
  return x.body.user
}
