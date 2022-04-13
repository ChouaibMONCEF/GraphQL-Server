const mongoose = require("mongoose")

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill this field!"],
  },
  email: {
    type: String,
    required: [true, "Please fill this field!"],
    unique: true,
    lowercase: true,
  },
  isbanned: {
    type: Boolean,
    default: false,
  },
})

const Owner = mongoose.model("owner", ownerSchema)

module.exports = Owner
