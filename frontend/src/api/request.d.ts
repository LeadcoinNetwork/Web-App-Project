export enum methods {
  post = "post",
  get = "get",
}
export type request = (method: methods, url, body?) => Promise<any>
