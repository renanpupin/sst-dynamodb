export const myTable = new sst.aws.Dynamo("MyTable", {
    fields: {
        id: "string",
        createdAt: "number",
    },
    primaryIndex: { hashKey: "id", rangeKey: "createdAt" }
});