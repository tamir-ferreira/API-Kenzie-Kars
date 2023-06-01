import express, { Application, json } from "express";
import cors from "cors";
import "express-async-errors";
import "reflect-metadata";
import { errorHandler } from "./errors";

const app: Application = express();
app.use(json());
app.use(cors());

// rotas

app.use(errorHandler);

export default app;
