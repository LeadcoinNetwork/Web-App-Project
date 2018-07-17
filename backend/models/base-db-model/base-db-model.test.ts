import BaseDBModel from "./base-db-model"
import SQL from "../mysql-pool/mysql-pool"
import config from "../../app-logic/config"
import NotFound from "../../utils/not-found"

interface INew {
  name: string
  telephone: string
}
interface IExisting {
  id: number
  name: string
  telephone: string
}
interface ICondition {
  id?: number
  name?: string
  telephone?: string
}
class DBModel extends BaseDBModel<INew, IExisting, ICondition> {
  public insert(arg: INew) {
    return super.insert(arg)
  }
  public tryGetById(id) {
    return super.tryGetById(id)
  }
  public update(p1, p2) {
    return super.update(p1, p2)
  }
  public find(...args) {
    //@ts-ignore
    return super.find(...args)
  }
}
var sql = new SQL(config)
var dbModel = new DBModel(sql, "users")

test("insert", async () => {
  class DBModel extends BaseDBModel<INew, IExisting, ICondition> {
    public insert(arg: INew) {
      return super.insert(arg)
    }
  }
  var sql = new SQL(config)
  var dbModel = new DBModel(sql, "users")

  var x = await dbModel.insert({ telephone: "123", name: "danny" })
  expect(x.insertId).toBeGreaterThan(0)
})

test("insert and tryFindByID", async () => {
  var x = await dbModel.insert({ telephone: "123", name: "danny" })
  var newid = x.insertId
  var y = await dbModel.tryGetById(newid)
  if (y instanceof NotFound) {
    throw new Error("user should be found")
  }
  expect(y.name).toEqual("danny")
})

test("insert and tryFindByID", async () => {
  var x = await dbModel.insert({ telephone: "123", name: "danny" })
  var newid = x.insertId
  var y = await dbModel.tryGetById(newid)
  if (y instanceof NotFound) {
    throw new Error("user should be found")
  }
  expect(y.name).toEqual("danny")
})

test("insert and update", async () => {
  var x = await dbModel.insert({ telephone: "123", name: "danny" })
  var newid = x.insertId
  await dbModel.update(newid, { name: "new name" })
  var result = await dbModel.tryGetById(newid)
  if (result instanceof NotFound) {
    throw new Error("should found the user")
  }
  expect(result.name).toEqual("new name")
  expect(result.telephone).toEqual("123")
})
test("find by name (not by id)", async () => {
  var x = await dbModel.insert({ telephone: "123", name: "danny2" })
  var newid = x.insertId
  var result = await dbModel.find({ condition: { name: "danny2" } })
  if (result instanceof NotFound) {
    throw new Error("should found the user")
  }
  expect(result[0].name).toEqual("danny2")
  expect(result[0].telephone).toEqual("123")
})
