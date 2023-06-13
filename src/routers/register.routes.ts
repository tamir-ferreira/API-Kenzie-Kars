import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";

const registerRoutes: Router = Router();

registerRoutes.post("", createUserController);

export default registerRoutes;
