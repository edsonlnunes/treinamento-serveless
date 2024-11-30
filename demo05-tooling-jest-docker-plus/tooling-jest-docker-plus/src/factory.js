const aws = require("aws-sdk");

const s3Config = {
  s3ForcePathStyle: true,
};

const isLocal = process.env.IS_OFFLINE; // setado pelo serverless-offline

if (isLocal) {
  aws.config.update({
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
    },
  });
  const host = "http://localhost:4566";
  s3Config.endpoint = new aws.Endpoint(host);
}

const s3 = new aws.S3(s3Config);

module.exports = {
  s3,
};
