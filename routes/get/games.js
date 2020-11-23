function getGames(Game) {
  return async (req, res) => {
    try {
      if (req.query.id) {
        res.send(await Game.findById(req.query.id));
        return;
      }
      return res.send(await Game.find());
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = getGames;
