export interface HttpRequest {
  params?: any
  body?: any
}
export interface HttpResponse {
  body: any
}
export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse | void>
}
