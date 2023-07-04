import { Request, Response } from "express";
import { tAdvertRequest } from "../interfaces/adverts.interfaces";
import createAdvertService from "../services/adverts/createAdvert.service";
import readAdvertsService from "../services/adverts/readAdverts.service";
import updateAdvertService from "../services/adverts/updateAdvert.service";
import deleteAdvertService from "../services/adverts/deleteAdvert.service";
import readAdvertByIdService from "../services/adverts/readAdvertById.service";
import readAdvertByIdUserService from "../services/adverts/readAdvertByIdUser.service";

export const createAdvertController = async (req: Request, res: Response) => {
  const body: tAdvertRequest = req.body;
  const userId = res.locals.userId;

  const newAdvert = await createAdvertService(body, userId);

  return res.status(201).json(newAdvert);
};

export const readAdvertsController = async (req: Request, res: Response) => {
  const query: any = req.query;
  const adverts = await readAdvertsService(query);

  return res.status(200).json(adverts);
};

export const readAdvertByIdController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const advert = await readAdvertByIdService(id);

  return res.status(200).json(advert);
};

export const readAdvertByIdUserController = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);
  const query: any = req.query;
  const advert = await readAdvertByIdUserService(id, query);

  return res.status(200).json(advert);
};

export const updateAdvertController = async (req: Request, res: Response) => {
  const body = req.body;
  const id = Number(req.params.id);
  const updatedAdvert = await updateAdvertService(body, id);

  return res.status(200).json(updatedAdvert);
};

export const deleteAdvertController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await deleteAdvertService(id);

  return res.status(204).json();
};
