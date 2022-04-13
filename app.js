const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const dotenv = require("dotenv")
const schema = require('./Schema/schema')
const mongoose = require("mongoose")

const app = express()

dotenv.config({
  path: "./config.env",
})

const database = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
)

mongoose.connect(database).then((con) => {
  console.log("Connected to DB!!")
})

const PORT = process.env.PORT || 5000


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)


app.listen(PORT, () => {
  console.log("Listing on port: ", PORT)
})
