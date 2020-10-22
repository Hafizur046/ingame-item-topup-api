function deleteGame(Game) {
  return async (req, res) => {
    console.log(req.params.id);
    await Game.findByIdAndDelete(req.params.id);
    res.send("deleted");
  };
}

module.exports = deleteGame;
