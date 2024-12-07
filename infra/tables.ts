export const myTable = new sst.aws.Dynamo("MyTable", {
    fields: {
        id: "string",
        createdAt: "number",
    },
    primaryIndex: { hashKey: "id" },
    globalIndexes: {
        CreatedAtIndex: { hashKey: "id", rangeKey: "createdAt" }
    }
});