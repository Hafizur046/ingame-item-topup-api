function deleteGame(Game) {
  return async (req, res) => {
    Game.findByIdAndDelete(req.params.id);
    res.send("deleted");
  };
}

module.exports = deleteGame;
