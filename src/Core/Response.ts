import { ServerResponse } from "http";

export default class Response {
  private response: ServerResponse;

  public constructor(response: ServerResponse) {
    this.response = response;
  }

  public json(data: any, status: number) {
    this.response.setHeader("Content-Type", "application/json");
    this.response.statusCode = status;
    this.response.write(JSON.stringify(data));
    this.response.end();
  }
}
