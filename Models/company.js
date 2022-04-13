const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill this field!"],
  },
  owners: [
    {
      type: String,
      ref: "owner",
    },
  ],
})

const Company = mongoose.model("company", companySchema)

module.exports = Company
