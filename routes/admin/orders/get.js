function getOrders(Model) {
  return async (req, res, next) => {
    //this route is a little bit different than others cause I tried to do things just a little differently
    //here the data gets querried from the database than stored in req.result.values
    //then I just call the next()

    //setting some variables using the req datas
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let startIndex = (page - 1) * limit;

    //setting res.result as an empty object which is gonna store the values object
    res.result = {};
    try {
      //if req provides an id query than its served a array with only one object that is querried using the id

      //warning
      //warning
      //warning
      //this is a bodge
      if (req.query.id) {
        res.result.values = [await Model.findById(Number(req.query.id))];
        res.result.total = 1;
        next();
      }

      //checking if req provides req.query.status and setting the query used to query the database accordingly
      let query = {};
      if (req.query.status) {
        query = { status: req.query.status };
      }

      //querring the database and storing the response in res.result.values
      res.result.total = await Model.countDocuments(query);
      res.result.values = await Model.find(query)
        //.sort({ orderedAt: -1 })
        .sort({ orderedAt: "desc" })
        .skip(startIndex)
        .limit(limit)
        .populate("package")
        .populate("orderedBy")
        .exec();
      next();
    } catch (errs) {
      console.log(errs);
    }
  };
}

module.exports = getOrders;
