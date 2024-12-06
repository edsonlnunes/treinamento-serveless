const Handler = require("./handler");
const { validatorDecorator } = require("./util");
const { dynamoDB } = require("./factory");

const handler = new Handler({ dynamoDBSvc: dynamoDB });

const heroInsert = validatorDecorator(
  handler.main.bind(handler), // o .bin garante que a variavel this seja o conteúdo do handler
  Handler.validator(),
  "body"
);

const heroesTrigger = async (event) => {
  console.log("event >>> ", JSON.stringify(event));
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
  heroesTrigger,
  heroInsert,
};
