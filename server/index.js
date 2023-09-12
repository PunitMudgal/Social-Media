import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer, { MulterError } from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import connectDb from "./config/dbConnection.js";
// import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import authRoutes from "./router/auth.js";
import userRoutes from "./router/user.js";
import postRoutes from "./router/post.js";
import Auth from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/** ROUTES WITH FILES */
// app.post("/auth/register", register);
app.use("/posts", Auth, upload.single("picture"), createPost);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE SETUP
const port = process.env.PORT || 6001;

connectDb().then(() => {
  try {
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);

      // User.insertMany(users);
      // Post.insertMany(posts);
    });
  } catch (error) {
    console.log("cannot connect to the server", error);
  }
});
