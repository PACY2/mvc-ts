import { createServer, IncomingMessage, ServerResponse } from "http";
import Router from "./Router";
import { Config } from "./Types/Application";

export default class Application {
  public static config: Config;

  public constructor(config: Config) {
    Application.config = config;
  }

  public listen(port: 3000) {
    const server = createServer();

    server.on(
      "request",
      (request: IncomingMessage, response: ServerResponse) => {
        let body: string = "";

        request.on("data", (chunk: any) => {
          body += chunk.toString();
        });

        request.on("end", () => {
          const router = new Router({ body, request, response });

          router.resolve();
        });
      }
    );

    server.listen(port, () =>
      console.log(`The server is running on port ${port}`)
    );
  }
}
