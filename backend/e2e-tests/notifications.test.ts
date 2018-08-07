import * as Chance from "chance"
import * as _ from "lodash"

import API from "../../frontend/src/api/index"

import * as RoutesForTests from "./utils/routes.for.tests"
import * as ValidatedUserForTests from "./utils/user.for.tests"

var { request, appLogic, ApiForToken } = RoutesForTests.create()

beforeEach(async () => {
  await appLogic.models.notifications.deleteAll()
})

test("notifications are only being sent once", async () => {
  var { user, token } = await ValidatedUserForTests.create({
    users: appLogic.models.users,
  })

  appLogic.models.notifications.createNotification({
    userId: user.id,
    msg: "testmsg1",
    unread: true,
  })
  let body = await ApiForToken(token).notifications.getNotifications()
  expect(body.list.length).toBe(1)
  expect(body.unreadCount).toBe(1)
  let body2 = await ApiForToken(token).notifications.getNotifications()
  expect(body2.list.length).toBe(1)
  expect(body2.unreadCount).toBe(0)
})
