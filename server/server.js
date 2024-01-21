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

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3001",
//       "https://krutarthjankat.github.io",
//       "http://localhost:3000",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",
    "https://krutarthjankat.github.io"
   );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials",true);
  next();
});

app.use("/", authRoute);
app.get("/profiles", profilesController.fetchProfiles);
app.put("/profiles/:id", profilesController.updateProfile);
app.delete("/profiles/:id", profilesController.deleteProfile);
app.listen(process.env.PORT);
