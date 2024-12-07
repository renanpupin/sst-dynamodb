import { myTable } from "./tables";

export const api = new sst.aws.Function("MyApp", {
    handler: "src/index.handler",
    link: [myTable],
    url: true,
  });