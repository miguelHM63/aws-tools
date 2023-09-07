const AWS = require("aws-sdk");
const securityGroups = require("./securityGroups");
require("dotenv").config();

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

console.log(process.env.AWS_ACCESS_KEY_ID);

AWS.config.credentials = credentials;
// AWS.config.update({ region: process.env.AWS_REGION });
const ec2 = new AWS.EC2();

async function editSecurityGroupRule() {
  const data = await securityGroups();
  try {
    const promises = data.map((rules) => {
      return ec2.modifySecurityGroupRules(rules).promise();
    });
    const result = await Promise.all(promises);
    console.log("Security group rule modified successfully::", result.length);
  } catch (error) {
    console.error("Error modifying security group rule", error);
  }
}

// run main function
editSecurityGroupRule();
