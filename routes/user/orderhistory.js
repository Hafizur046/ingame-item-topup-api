function getOrderHistory(Order) {
  return async (req, res) => {
    try {
      res.send(await Order.find({ orderedBy: req.User._id }).sort({ dateUploaded: -1 }))
    }catch(err){
      console.log(err)
    }

module.exports = getOrderHistory;
