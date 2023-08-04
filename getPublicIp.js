const axios = require("axios");

const getPublicIp = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    throw new Error("Error al obtener ip publica");
  }
};

module.exports = getPublicIp;
