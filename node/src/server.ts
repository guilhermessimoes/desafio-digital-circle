import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes/routes";

const app = express()
const cors = require('cors')
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(4050, ()=> console.log('Server is running on Port 4050'))

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);