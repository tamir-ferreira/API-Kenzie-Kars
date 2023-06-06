import { Request, Response } from 'express';
import { tAdvertRequest } from '../interfaces/adverts.interfaces';
import createAdvertService from '../services/adverts/createAdvert.service';
import readAdvertsService from '../services/adverts/readAdverts.service';
import updateAdvertService from '../services/adverts/updateAdvert.service';
import deleteAdvertService from '../services/adverts/deleteAdvert.service';

const createAdvertController = async (req: Request, res: Response) => {
  const body: tAdvertRequest = req.body;
  const newAdvert = await createAdvertService(body);

  return res.status(201).json(newAdvert);
};

const readAdvertsController = async (req: Request, res: Response) => {
  const adverts = await readAdvertsService();

  return res.status(200).json(adverts);
};

const updateAdvertController = async (req: Request, res: Response) => {
  const body = req.body;
  const id = Number(req.params.id);
  const updatedUser = await updateAdvertService(body, id);

  return res.status(200).json({ updatedUser });
};

const deleteAdvertController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await deleteAdvertService(id);

  return res.status(204).json();
};

export {
  createAdvertController,
  readAdvertsController,
  updateAdvertController,
  deleteAdvertController,
};
