import { SuperAgentStatic } from "superagent"
import { methods, request } from "./request"

export default class UserApi {
  constructor(private request: request) {}
  async login({ email, password }) {
    return await this.request(methods.post, "/auth/login", { email, password })
  }
  async getMe() {
    return await this.request(methods.get, "/me")
  }
  async signUp(data) {
    return this.request(methods.post, "/user", data)
  }
  async resendEmail() {
    return await this.request(methods.get, "/auth/resend-email")
  }
  async completeProfile(data: { company; phone; country }) {
    return this.request(methods.post, "/complete-profile", data)
  }
  async logout() {
    this.request(methods.post, "/auth/logout")
  }
}
