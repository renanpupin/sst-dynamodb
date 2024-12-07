/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-dynamodb",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const {myTable, api} = await import("./infra");
    
    return {
      app: api.url,
      table: myTable.name,
    };
  },
});
