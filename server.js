/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const dotenv = require("dotenv");
const cors = require("cors");
const getAllParticipants = require("./routes/users");
const signinRouter = require("./routes/signin");
const connectDB = require("./database/connect");

const app = express();

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

app.use(cors());
app.use("/", getAllParticipants);
app.use("/", signinRouter);

app.get("/", (req, res) => {
  res.send("Welcome to AMS Restful APIs");
});

dotenv.config();

// eslint-disable-next-line no-undef

connectDB();
let PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
