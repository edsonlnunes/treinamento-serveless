const { s3 } = require("./factory");

module.exports.handler = async (event) => {
  const allBuckets = await s3.listBuckets().promise();
  console.log("found >>>>>> ", allBuckets);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        allBuckets,
      },
      null,
      2
    ),
  };
};
