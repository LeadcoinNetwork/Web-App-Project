import { IModels } from "./index"

export default class Bets {
  constructor(private models: IModels) {}

  public async getOne(condition) {
    return await this.models.users.getOne(condition)
  }

  public async updateRole(id, role) {
    return await this.models.users.updateUser(id, { role })
  }

  public async getAllUsers(condition, sort, limit) {
    let [bets, count] = await this.models.users.getAllUsers(
      condition,
      sort,
      limit,
    )
    return [bets, count]
  }
}
