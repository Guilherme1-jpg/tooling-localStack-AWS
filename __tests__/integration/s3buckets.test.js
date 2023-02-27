const {
  describe,
  it,

  beforeAll,
  afterAll,
} = require("@jest/globals");
const { hello } = require("../../src");

const { S3 } = require("../../src/factory");

describe("Test AWS services offline with LocalStack", () => {
  const bucketConfig = {
    Bucket: "tooling-jest-docker",
  };

  beforeAll(async () => {
    await S3.createBucket(bucketConfig).promise();
  });

  afterAll(async () => {
    await S3.deleteBucket(bucketConfig).promise();
  });
  it("it should return an array with a s3 bucket", async () => {
    const expected = bucketConfig.Bucket;

    const response = await hello();

    const {
      allBuckets: { Buckets },
    } = JSON.parse(response.body);

    const { Name } = Buckets.find(({ Name }) => Name === expected);

    expect(Name).toStrictEqual(expected);

    expect(response.statusCode).toStrictEqual(200);
  });
});
