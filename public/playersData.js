let availablePlayers = []
let playersId = {}

fetch("./players.txt")
  .then((response) => response.text())
  .then((data) => {
    data.split("\n").forEach((line) => {
      const regex = /^(\d+)\s+(.*)$/;
      const match = regex.exec(line);
      if (match) {
        const id = match[1];
        const playerName = match[2];
        playersId[playerName] = id
      }
    });
    availablePlayers = Object.keys(playersId);
    window.availablePlayers = availablePlayers;
    window.playersId = playersId;
  })
  .catch((error) => {
    console.log(error);
  });

export {availablePlayers, playersId};