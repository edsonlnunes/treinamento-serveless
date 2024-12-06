const joi = require("@hapi/joi");
const { randomUUID } = require("node:crypto");

class Handler {
  constructor({ dynamoDBSvc }) {
    this.dynamoDBSvc = dynamoDBSvc;
  }

  static validator() {
    return joi.object({
      name: joi.string().max(100).min(2).required(),
      power: joi.string().max(100).min(2).required(),
    });
  }

  async main(event) {
    const data = event.body;

    const params = {
      TableName: "Heroes",
      Item: {
        ...data,
        id: randomUUID(),
        createdAt: new Date().toISOString(),
      },
    };

    await this.dynamoDBSvc.put(params).promise();

    const insertedItem = await this.dynamoDBSvc
      .query({
        TableName: "Heroes",
        ExpressionAttributeValues: {
          ":id": params.Item.id,
        },
        KeyConditionExpression: "id = :id",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(insertedItem, null, 2),
    };
  }
}

module.exports = Handler;
