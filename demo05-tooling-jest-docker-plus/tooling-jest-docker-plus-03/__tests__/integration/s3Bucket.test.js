const {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
} = require("@jest/globals");

const { s3 } = require("../../src/factory");
const { handler } = require("../../src");

describe("Testing AWS Servicess offline with LocalStack", () => {
  const bucketConfig = {
    Bucket: "test",
  };

  beforeAll(async () => {
    await s3.createBucket(bucketConfig).promise();
  });

  afterAll(async () => {
    await s3.deleteBucket(bucketConfig).promise();
  });

  test("Should return an array with a S3 Bucket", async () => {
    const expected = bucketConfig.Bucket;

    const response = await handler();

    const {
      allBuckets: { Buckets },
    } = JSON.parse(response.body);

    const { Name } = Buckets[0];

    expect(Name).toStrictEqual(expected);
    expect(response.statusCode).toStrictEqual(200);
  });
});
