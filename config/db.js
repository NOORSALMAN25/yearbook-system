const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on("connected", () => {
  console.log(`successfully connected to ${mongoose.connection.name}`)
})

module.exports = mongoose