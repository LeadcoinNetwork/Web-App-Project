import Notifications from "./notifications"
import * as Chance from "chance"
var chance = Chance()
import "./types"
import config from "../../app-logic/config"

import SQL from "../mysql-pool/mysql-pool"
var notifications = new Notifications(new SQL(config))

beforeEach(async () => {
  await notifications.deleteAll()
})

test("create a notification", async () => {
  const { affectedRows } = await notifications.createNotification({
    msg: "test msg",
    userId: 1,
    unread: true,
  })
  expect(affectedRows).toBe(1)
})

test("get notification for user X", async () => {
  const { affectedRows } = await notifications.createNotification({
    msg: "test msg",
    userId: 1,
    unread: true,
  })
  const _notifications = await notifications.getNotificationsByUserId(1)
  expect(_notifications.length).toBe(1)
})

test("mark notification as read for user X", async () => {
  const { affectedRows } = await notifications.createNotification({
    msg: "test msg",
    userId: 1,
    unread: true,
  })
  const { changedRows } = await notifications.MarkAllNotificationAsReadForUser(
    1,
  )
  expect(changedRows).toBe(1)
})
