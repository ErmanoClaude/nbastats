const axios = require("axios");

const options = {
  method: "GET",
  url: "https://api-nba-v1.p.rapidapi.com/players/statistics",
  params: { id: "1" ,
          season:"2022"},
  headers: {
    "X-RapidAPI-Key": process.env.apiNbaKey,
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
  },
};

async function searchPlayer(player) {
  options["params"]["id"] = player;
  try {
    const response = await axios.request(options);
     return response.data.response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = searchPlayer;
