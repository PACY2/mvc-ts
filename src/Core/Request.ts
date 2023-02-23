import { IncomingMessage } from "http";

export default class Request {
  public url: string;
  public method: string;
  public body: any;
  public params: { [key: string]: string }[] = [];

  public constructor(request: IncomingMessage, body: string) {
    this.url = request.url as string;
    this.body = body ? JSON.parse(body) : null;
    this.method = request.method as string;
  }
}
