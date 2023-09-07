const getPublicIp = require("./updateSecurityGroupRule/getPublicIp.js");

const securityGroups = async () => {
  const myPublicIp = await getPublicIp();
  return [
    {
      GroupId: "sg-xxxxxxx", // securityGroup Id
      SecurityGroupRules: [
        {
          SecurityGroupRuleId: "sgr-xxxx", // securityGroupRule Id
          SecurityGroupRule: {
            IpProtocol: "tcp",
            FromPort: 22, // start port range
            ToPort: 22, // end port range
            CidrIpv4: `${myPublicIp}/32`, // option My IP
            Description: "Description for rule", // Description - optional
          },
        },
      ],
    },
    //...more securityGroups
  ];
};

module.exports = securityGroups;
