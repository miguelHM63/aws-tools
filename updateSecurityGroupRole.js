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
// AWS.config.update({ region: process.env.AWS_REGION }); // Reemplaza con tu región de AWS

const ec2 = new AWS.EC2();

async function editSecurityGroupRule() {
  const data = await securityGroups();
  /*   const params = [
    {
      GroupId: "sg-048bcf0e899dea17a", // MonitorServer
      SecurityGroupRules: [
        {
          SecurityGroupRuleId: "sgr-04193518ea4ec01b7",
          SecurityGroupRule: {
            IpProtocol: "tcp",
            FromPort: 22,
            ToPort: 22,
            CidrIpv4: `${myPublicIp}/32`,
            Description: "miguel",
          },
        },
      ],
    },
    {
      GroupId: "sg-05edc0f586dafc7ea", // Morty
      SecurityGroupRules: [
        {
          SecurityGroupRuleId: "sgr-05e5d15e053491007",
          SecurityGroupRule: {
            IpProtocol: "tcp",
            FromPort: 22,
            ToPort: 22,
            CidrIpv4: `${myPublicIp}/32`,
            Description: "miguel",
          },
        },
      ],
    },
    {
      GroupId: "sg-06ee193132c53b5c2", // Morty
      SecurityGroupRules: [
        {
          SecurityGroupRuleId: "sgr-06618d9e36b1dfa89",
          SecurityGroupRule: {
            IpProtocol: "tcp",
            FromPort: 22,
            ToPort: 22,
            CidrIpv4: `${myPublicIp}/32`,
            Description: "miguel",
          },
        },
      ],
    },
    {
      GroupId: "sg-01485573c71c24b00", // bifrost
      SecurityGroupRules: [
        {
          SecurityGroupRuleId: "sgr-0947751bb90f15a67",
          SecurityGroupRule: {
            IpProtocol: "tcp",
            FromPort: 22,
            ToPort: 22,
            CidrIpv4: `${myPublicIp}/32`,
            Description: "miguel",
          },
        },
      ],
    },
  ]; */

  try {
    const promises = data.map((rules) => {
      return ec2.modifySecurityGroupRules(rules).promise();
    });
    const result = await Promise.all(promises);
    console.log("Regla de seguridad modificada exitosamente:", result.length);
  } catch (error) {
    console.error("Error al modificar la regla de seguridad:", error);
  }
}

// Ejecuta la función para editar la regla de seguridad
editSecurityGroupRule();
