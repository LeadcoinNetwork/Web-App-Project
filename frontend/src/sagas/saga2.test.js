import Saga2 from "./saga2"

describe("test saga2", () => {
  it("test #2", async () => {
    var saga2 = Saga2()
    var actual = []

    var expected = [
      {
        value: { "@@redux-saga/IO": true, TAKE: { pattern: "*" } },
        done: false,
      },
      {
        value: { "@@redux-saga/IO": true, TAKE: { pattern: "*" } },
        done: false,
      },
      {
        value: { "@@redux-saga/IO": true, TAKE: { pattern: "*" } },
        done: false,
      },
    ]
    actual.push(saga2.next())
    actual.push(saga2.next())
    actual.push(saga2.next())
    expect(actual).toEqual(expected)
  })
})
