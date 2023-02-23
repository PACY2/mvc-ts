import Request from "../../Core/Request";
import Response from "../../Core/Response";

export default class ProductController {
  public index(request: Request, response: Response) {
    response.json({ body: request.body }, 200);
  }
}
