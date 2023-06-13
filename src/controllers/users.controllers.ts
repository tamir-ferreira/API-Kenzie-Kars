import { Request, Response } from "express";
import { UserRequest } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import { LoginRequest } from "../interfaces/users.interfaces";
import loginService from "../services/users/login.service";

export const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: UserRequest = request.body;
  const newUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

export const loginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginData: LoginRequest = request.body;
  const token = await loginService(loginData);

  return response.json({ token });
};
