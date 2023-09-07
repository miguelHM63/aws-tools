// Import EC2 client and ModifySecurityGroupRules command classes from SDK v3
const {
  EC2Client,
  ModifySecurityGroupRulesCommand,
} = require("@aws-sdk/client-ec2");

// Import dotenv to load environment variables from .env file
const dotenv = require("dotenv");
const getSecurityGroups = require("./securityGroups");

// Load environment variables
dotenv.config();

// Create EC2 client instance
const ec2Client = new EC2Client({
  // Set AWS region
  region: process.env.AWS_REGION,

  // Set credentials from environment variables
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function editSecurityGroupRule() {
  // Get security group rules data
  const securityGroupsData = await getSecurityGroups();

  // Map rules data into ModifySecurityGroupRulesCommands
  const promises = securityGroupsData.map(async (rules) => {
    // Construct command for each set of rules
    const command = new ModifySecurityGroupRulesCommand(rules);

    // Send command to AWS
    return ec2Client.send(command);
  });

  try {
    const results = await Promise.all(promises);

    // Log success message
    console.log("Security group rule modified successfully:", results.length);
  } catch (error) {
    // Log any errors
    console.error("Error modifying security group rule", error);
  }
}

// Execute the main function
editSecurityGroupRule();
