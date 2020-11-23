function getOrderHistory(Model) {
  return async (req, res, next) => {
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let startIndex = (page - 1) * limit;
    let endIndex = startIndex + limit;
    let result = {};
    // console.log('Page: ', page, 'Limit: ', limit, 'startIndex', startIndex, 'Endindex: ', endIndex)
    console.log("this fucking users is", req.user);

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
      if (req.query.status) {
        res.result = {};
        res.result.values = await Model.find({
          status: req.query.status,
          orderedBy: req.User._id,
        })
          .sort({ dateUploaded: -1 })
          .skip(startIndex)
          .limit(limit)
          .populate("package")
          .exec()
          .populate("package.game")
          .exec();
        res.json(res.result);
      } else {
        res.result = {};
        res.result.values = await Model.find({ orderedBy: req.user._id })
          .sort({ dateUploaded: -1 })
          .skip(startIndex)
          .limit(limit)
          .populate("package")
          .populate("package.game")
          .exec();

        res.json(res.result);
      }
    } catch (errs) {
      console.log(errs);
    }
  };
}

module.exports = getOrderHistory;
