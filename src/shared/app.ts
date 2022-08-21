/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import { router } from "@routes/index";

import { AppError } from "./errors/AppError";

export const app = express();

app.use((req, res, next) => {
  // console.log(req.headers.origin);
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);
