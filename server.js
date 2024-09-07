import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import color from "colors";
import router from "./routes/api.js";
import {
  MAX_JSON_SIZE,
  PORT,
  REQUEST_NUMBER,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from "./app/config/config.js";
import { mongoDbConnection } from "./app/config/db.js";

//express init
const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(helmet());

//app use limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

//cache
app.set("etag", WEB_CACHE);

//route
app.use("/api", router);

//listen
app.listen(PORT, () => {
  mongoDbConnection();
  console.log(`server is running with port ${PORT}`.bgCyan.black);
});
