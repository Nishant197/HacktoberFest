import express from "express";
import bodyParser from "body-parser";
import fileupload from "express-fileupload";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import ConnectDB from "./database.js";
import Auth from "./routes/Auth.js";
import Dashboard from "./routes/Dashboard.js";
import Project from "./routes/Project.js";
import Education from "./routes/Education.js";
import Achievement from "./routes/Achievement.js";
import Certificate from "./routes/Certificate.js";
import Experience from "./routes/Experience.js";
import Introduction from "./routes/Introduction.js";
import Skill from "./routes/Skill.js";
import config from "./config.js";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const PORT = config.PORT;

var resumedp = express();
resumedp.use(express.json());
resumedp.use(express.urlencoded());
resumedp.use(cors());
resumedp.use(bodyParser.json(), urlencodedParser);
resumedp.use(fileupload());
resumedp.use(express.static("files"));
// Routes

resumedp.use("/auth", Auth);
resumedp.use("/dashboard", Dashboard);
resumedp.use("/project", Project);
resumedp.use("/education", Education);
resumedp.use("/achievement", Achievement);
resumedp.use("/experience", Experience);
resumedp.use("/certificate", Certificate);
resumedp.use("/introduction", Introduction);
resumedp.use("/skill", Skill);

resumedp.get("/", (req, res) => {
  res.send("Welcome to resumedp");
});

// Server Running Configuration
resumedp.listen(PORT, () => {
  ConnectDB()
    .then(() => console.log(`Server is Running  at Port ✌`))
    .catch(() =>
      console.log(
        "Error in Connecting to Database. Please Check your Database Configurations"
      )
    );
});
