const express = require("express");
const fileUpload = require("express-fileUpload");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(fileUpload());

//Uploading Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "no file available for upload" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/upload/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
  });
});

app.listen(5000, () => console.log("🚀 server up and ready!"));
