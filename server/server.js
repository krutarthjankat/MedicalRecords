if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const cron = require("node-cron"); 
const https = require("https");
const profilesController = require("./controllers/profilesController");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());

connectToDb();

const backendUrl = "https://medicalrecords.onrender.com/profiles";
cron.schedule("*/180 * * * * *", function () {
  console.log("Restarting server");

  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Restarted");
      } else {
        console.error(`failed to restart with status code: ${res.statusCode}`);
      }
    })
    .on("error", (err) => {
      console.error("Error ", err.message);
    });
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://medicalrecords.onrender.com",
      "https://krutarthjankat.github.io/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/", authRoute);
app.get("/profiles", profilesController.fetchProfiles);
app.put("/profiles/:id", profilesController.updateProfile);
app.delete("/profiles/:id", profilesController.deleteProfile);
app.listen(process.env.PORT);
