import { Request, Response } from "express";
import { UserRequest } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import { LoginRequest } from "../interfaces/users.interfaces";
import loginService from "../services/users/login.service";
import listUsersService from "../services/users/listUsers.service";
import { listUserByIdService } from "../services/users/listUserById.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import sendEmailResetPasswordService from "../services/users/sendEmailResetPassword.service";
import resetPasswordService from "../services/users/resetPassword.service";

export const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: UserRequest = request.body;
  const newUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

export const listUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await listUsersService();

  return response.status(200).json(users);
};

export const listUserByIdController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idUser: number = parseInt(request.params.id);
  const user = await listUserByIdService(idUser);

  return response.status(200).json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const body = req.body;
  const id = Number(req.params.id);
  const updatedUser = await updateUserService(body, id);

  return res.status(200).json(updatedUser);
};

export const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idUser: number = parseInt(request.params.id);
  await deleteUserService(idUser);

  return response.status(204).json();
};

export const loginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginData: LoginRequest = request.body;
  const token = await loginService(loginData);

  return response.json({ token });
};

export const sendEmailResetPasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  await sendEmailResetPasswordService(email);
  return res.json({ message: "token sent" });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  await resetPasswordService(password, token);

  return res.json({ message: "password changed successfully" });
};
