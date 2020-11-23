function getUsers(Model) {
  return async (req, res) => {
    //setting some variables using the req datas
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let startIndex = (page - 1) * limit;

    //setting res.result as an empty object which is gonna store the values object
    res.result = {};
    try {
      //warning
      //warning
      //warning
      //this is a bodge
      //if req provides query.username just return the user as an array inside result.values;
      if (req.query.username) {
        res.result.total = 1;
        res.result.values = await Model.find({ username: req.query.username });
        res.json(res.result);
        return;
      }

      //querring the database and storing the response in res.result.values
      res.result.total = await Model.countDocuments();
      res.result.values = await Model.find()
        .sort({ joinedAt: -1 })
        .skip(startIndex)
        .limit(limit)
        .exec();
      res.result.total = res.result.values.length;
      res.json(res.result);
      return;
    } catch (errs) {
      console.log(errs);
    }
  };
}

module.exports = getUsers;
