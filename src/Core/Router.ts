import { IncomingMessage, ServerResponse } from "http";
import { RouterConstructor, Routes } from "./Types/Router";
import Request from "./Request";
import Response from "./Response";
import routes from "../routes/api";
import Application from "./Application";
import { join } from "path";

export default class Router {
  private request: Request;
  private response: Response;
  private routes: Routes = routes;

  public constructor({ body, request, response }: RouterConstructor) {
    this.request = new Request(request, body);
    this.response = new Response(response);
  }

  /**
   * Used to grab the controller @ method and the url params
   */
  private getMethodAndParams(
    url: string
  ): [string, { [key: string]: string }[]] | null {
    const routes = this.routes;
    let method: string | null = null;
    let params: { [key: string]: string }[] = [];

    routes.some((route) => {
      let path = route.path;

      if (path.includes("{")) {
        path = path.replaceAll(/\{\w+\}/gi, "[a-zA-Z0-9]+");

        const pattern = new RegExp(`^${path}$`, "ig");

        if (pattern.test(url)) {
          method = route.method;

          const splited_path = route.path.split("/");
          const splited_url = url.split("/");

          splited_path.forEach((piece: string, index: number) => {
            if (piece.includes("{")) {
              params.push({
                [piece.replace("{", "").replace("}", "")]: splited_url[index],
              });
            }
          });

          return true;
        }
      } else {
        if (path === url) {
          method = route.method;
          return true;
        }
      }
    });

    if (method) {
      return [method, params];
    }

    return null;
  }

  public resolve() {
    // get request method and params
    let response = this.getMethodAndParams(this.request.url);

    // check if there is a method for the request
    if (response) {
      let [method, params] = response;

      this.request.params = params;

      let controller = method.split("@")[0];
      method = method.split("@")[1];

      // get the controller from the controllers folder
      let Controller = require(join(
        Application.config.ROOT_DIR,
        "app/Controllers/",
        controller + ".js"
      )).default;

      // create an instance
      const instance = new Controller();

      // execute the method
      instance[method](this.request, this.response);
    } else {
      // return 404 method not found
      this.response.json({ message: "route not found" }, 404);
    }
  }
}
