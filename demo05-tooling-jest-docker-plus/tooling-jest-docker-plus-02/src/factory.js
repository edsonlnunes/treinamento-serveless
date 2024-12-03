const aws = require("aws-sdk");

const s3Config = {
  s3ForcePathStyle: true,
};

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

  const host = process.env.LOCALSTACK_HOST || "localhost";

  s3Config.endpoint = new aws.Endpoint(`http://${host}:4566`);
}

const s3 = new aws.S3(s3Config);

module.exports = {
  s3,
};
