const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const path = require("path");

// allow cross-origin requests
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect("mongodb://localhost:27017/graphql-ninja");
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log("now listening for requests on port 4000");
});
