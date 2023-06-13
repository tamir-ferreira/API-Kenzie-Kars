import express, { Application, json } from "express";
import cors from "cors";
import "express-async-errors";
import "reflect-metadata";
import { errorHandler } from "./errors";
import advertsRoutes from "./routers/adverts.routes";
import registerRoutes from "./routers/register.routes";
import loginRoutes from "./routers/login.routes";

const app: Application = express();
app.use(json());
app.use(cors());

// rotas
app.use("/adverts", advertsRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use(errorHandler);

export default app;
