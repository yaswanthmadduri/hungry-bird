const mongoose = require('mongoose')
const connectionString = "mongodb+srv://yaswanth:tknIDZPoWYFgz3Xr@hungrybirdcluster.fokxh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


module.exports = async () => {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })

  return mongoose
}