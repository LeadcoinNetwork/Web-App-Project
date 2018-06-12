// This file we do not import, is only to show the tests for it.
import Saga3 from "./saga3"
import semver from "semver"

describe("saga3", () => {
  it("saga 3", () => {
    expect(semver.gte(process.version, "8.5.0")).toEqual(true)
    var saga3 = Saga3()
    var actual = []

    actual.push(saga3.next())
    actual.push(saga3.next())

    expect(actual[0].value.PUT.action).toEqual({ type: "PUT_EFFECT_ACTION" })
    expect(actual[1].value.CALL.context).toEqual(console)
    expect(actual[1].value.CALL.fn).toEqual(console.log)
    expect(actual[1].value.CALL.args).toEqual(["argument to console log"])
  })
})
