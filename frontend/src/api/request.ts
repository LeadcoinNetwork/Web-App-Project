export enum methods {
  post = "post",
  get = "get",
  delete = "delete",
  put = "put",
}
export type request = (
  method: methods,
  url,
  body?,
  query?,
  attach?,
) => Promise<any>
