import { dirname } from "path";
import Application from "../Core/Application";
import { Config } from "../Core/Types/Application";

const config: Config = {
  ROOT_DIR: dirname(__dirname),
};

const app = new Application(config);

app.listen(3000);
