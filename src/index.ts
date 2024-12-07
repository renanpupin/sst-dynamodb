import { Handler } from "aws-lambda";
import { Resource } from "sst";
import { DynamoDBClient, PutItemCommand, GetItemCommand, QueryCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();

const getItem = async (id: string) => {
    const response = await client.send(new GetItemCommand({
        TableName: Resource.MyTable.name,
        Key: {
            id: { S: id }
        },
    }));
    return response
};

const queryItem = async (id: string) => {
    const response = await client.send(new QueryCommand({
        TableName: Resource.MyTable.name,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": { S: id }
        }
    }));
    return response
};

const addItem = async ({id}: any) => {
    await client.send(
        new PutItemCommand({
            TableName: Resource.MyTable.name,
            Item: {
                id: { S: id },
                createdAt: { N: Date.now().toString() }
            },
        })
    );
};

const updateItem = async (id: string) => {
    const data = await client.send(new UpdateItemCommand({
        TableName: Resource.MyTable.name,
        Key: {
            id: { S: id },
        },
        UpdateExpression: "SET #createdAt = :createdAt",
        ExpressionAttributeNames: {
            "#createdAt": "createdAt",
        },
        ExpressionAttributeValues: {
            ":createdAt": { S: Date.now().toString() },
        },
    }));
};


const deleteItem = async (id: string) => {
    const data = await client.send(new DeleteItemCommand({
        TableName: Resource.MyTable.name,
        Key: {
            id: { S: id },
        },
    }));
};

const scanTable = async () => {
    const response = await client.send(
        new ScanCommand({
            TableName: Resource.MyTable.name,
        })
    );
    return response
};

export async function handler(event: any) {
    // console.log(event);

    await addItem({id: "666"})
    await updateItem("666")
    await deleteItem("666")
    // const result = await queryItem()
    // const result = await getItem()
    const result = await scanTable()

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello, World!",
            data: result
        })
    };
}