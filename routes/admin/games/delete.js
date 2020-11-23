function deleteGame(Game) {
  return async (req, res) => {
    console.log(req.params.id);

    res.send(await Game.findByIdAndDelete(req.params.id));
  };
}

module.exports = deleteGame;
