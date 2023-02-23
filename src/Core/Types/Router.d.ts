export type Routes = { path: string; method: string }[];

export type RouterConstructor = {
  request: IncomingMessage;
  body: string;
  response: ServerResponse;
};
