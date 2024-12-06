const aws = require("aws-sdk");

const isLocal = process.env.IS_OFFLINE; // setado pelo serverless-offline

console.log("ISLOCAL >> ", process.env.IS_OFFLINE);
console.log("LOCALSTACK_HOST >> ", process.env.LOCALSTACK_HOST);

if (isLocal) {
  aws.config.update({
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
    },
  });
}

const dynamoDB = new aws.DynamoDB.DocumentClient({
  endpoint: isLocal ? new aws.Endpoint(`http://localhost:4566`) : undefined,
});

module.exports = {
  dynamoDB,
};
