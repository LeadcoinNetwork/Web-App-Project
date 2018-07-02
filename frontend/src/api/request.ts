export enum methods {
  post = "post",
  get = "get",
  delete = "delete",
  put = "put",
}
export type request = (method: methods, url, body?) => Promise<any>
