import { Request, Response } from "express";
import { UserRequest } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import { LoginRequest } from "../interfaces/users.interfaces";
import loginService from "../services/login/login.service";
import readUsersService from "../services/users/readUsers.service";
import readUserByIdService from "../services/users/readUserById.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import sendEmailResetPasswordService from "../services/resetPassword/sendEmailResetPassword.service";
import resetPasswordService from "../services/resetPassword/resetPassword.service";

export const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: UserRequest = request.body;
  const newUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

export const readUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await readUsersService();

  return response.status(200).json(users);
};

export const readUserByIdController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idUser: number = parseInt(request.params.id);
  const user = await readUserByIdService(idUser);

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
  return res.json({ message: "token enviado" });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  await resetPasswordService(password, token);

  return res.json({ message: "senha alterada com sucesso" });
};
