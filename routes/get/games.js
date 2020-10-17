function getGames(Game) {
  return async (req, res) => {
    try {
      res.send(await Game.find());
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = getGames;
