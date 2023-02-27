const AWS = require("aws-sdk");

const s3config = {
  s3ForcePathStyle: true,
};
const isLocal = process.env.IS_OFFLINE;

if (isLocal) {
  //variaveis setadas no compose
  // AWS.config.update({
  //   credentials: {
  //     accessKeyId: "test",
  //     secretAccessKey: "test",
  //   },
  // });

  const host = process.env.LOCALSTACK_HOST || "localhost";
  s3config.endpoint = new AWS.Endpoint(`http://${host}:4566`);
}

const S3 = new AWS.S3(s3config);

module.exports = {
  S3,
};
