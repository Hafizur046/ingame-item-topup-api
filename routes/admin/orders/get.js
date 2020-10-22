function getOrders(Model) {
  return async (req, res, next) => {
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let startIndex = (page - 1) * limit;
    let endIndex = startIndex + limit;
    let result = {};
    console.log(
      "Page: ",
      page,
      "Limit: ",
      limit,
      "startIndex",
      startIndex,
      "Endindex: ",
      endIndex
    );

    if (page > 1) {
      result.pre = {
        page: page - 1,
        limit: limit,
      };
    }
    if (
      (await Model.countDocuments({ status: req.query.status })) >
      endIndex + 1
    ) {
      console.log((await Model.countDocuments()) + "why");
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    try {
      let searchStatus = req.query.status;
      //console.log("Searched Cat: ", searchStatus);
      console.log(result);

      if (req.query.status) {
        console.log("the status is ", req.query.status);
        res.result = result;
        res.result.values = await Model.find({ status: req.query.status })
          //.sort({ dateUploaded: 1 })
          .sort({ _id: -1 })
          .skip(startIndex)
          .limit(limit)
          .populate("package")
          //.exec()
          //.populate("package.game")
          .exec();
        console.log(res.result);
        next();
      } else {
        res.result = {};
        res.result.values = await Model.find()
          .sort({ dateUploaded: -1 })
          .skip(startIndex)
          //.limit(limit)
          .populate("package")
          //.exec()
          //.populate("package.game")
          .exec();
        next();
      }
    } catch (errs) {
      console.log(errs);
    }
  };
}

module.exports = getOrders;
