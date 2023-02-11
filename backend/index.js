const express = require("express");
const api = express();

api.get("/", (req, res) => {
  res.send("Hello World!");
});

api.listen(process.env.PORT || 8080, () =>
  console.log("[+] Server Listening!")
);
