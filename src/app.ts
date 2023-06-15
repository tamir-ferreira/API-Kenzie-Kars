import express, { Application, json } from "express";
import cors from "cors";
import "express-async-errors";
import "reflect-metadata";
import advertsRoutes from "./routers/adverts.routes";
import loginRoutes from "./routers/login.routes";
import usersRoutes from "./routers/users.routes";
import { errorHandler } from "./errors";

const app: Application = express();
app.use(json());
app.use(cors());

// rotas
app.use("/adverts", advertsRoutes);
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use(errorHandler);

export default app;
