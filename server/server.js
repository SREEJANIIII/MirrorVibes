//In package.json: diff btw dependwencies and devDependencies is that dependencies are required for the application to run, while devDependencies are only needed during development and testing. In this case, there are no devDependencies listed in the package.json file.

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.ejs");
});

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});