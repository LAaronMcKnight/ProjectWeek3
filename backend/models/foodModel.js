const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
  },
  {
    tooObject: {virtuals: true},
    toJSON: { virtuals: true },
  }
)

const Food = mongoose.model("Food", foodSchema)

module.exports = Food