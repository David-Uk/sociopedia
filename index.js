import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(_dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/assets"),
  filename: (req, res, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

const PORT = process.env.PORT;

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
