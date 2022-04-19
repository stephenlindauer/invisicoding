const express = require("express");
const app = express();
app.use(express.static("public"));

// just redirect to encoder, no index page
app.get("/", function (req, res) {
  res.redirect("/encoder.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server is running on port " + port));
