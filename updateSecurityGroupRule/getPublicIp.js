const axios = require("axios");
const urlToGetPublicIp = "https://api.ipify.org?format=json";
const getPublicIp = async () => {
  try {
    const response = await axios.get(urlToGetPublicIp);
    return response.data.ip;
  } catch (error) {
    throw new Error("Error getting public ip");
  }
};

module.exports = getPublicIp;
