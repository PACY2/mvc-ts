import { Routes } from "../Core/Types/Router";

const routes: Routes = [
  {
    path: "/products",
    method: "ProductController@index",
  },
  {
    path: "/products/{id}",
    method: "ProductController@show",
  },
];

export default routes;
