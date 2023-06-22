import { Request, Response } from "express";
import { tAdvertRequest } from "../interfaces/adverts.interfaces";
import createAdvertService from "../services/adverts/createAdvert.service";
import readAdvertsService from "../services/adverts/readAdverts.service";
import updateAdvertService from "../services/adverts/updateAdvert.service";
import deleteAdvertService from "../services/adverts/deleteAdvert.service";
import { log } from "console";

const createAdvertController = async (req: Request, res: Response) => {
  const body: tAdvertRequest = req.body;
  const userId = res.locals.userId;

  console.log(userId);

  const newAdvert = await createAdvertService(body, userId);

  return res.status(201).json(newAdvert);
};

const readAdvertsController = async (req: Request, res: Response) => {
  const queryBrand: any = req.query.brand;
  const queryModel: any = req.query.model;
  const queryColor: any = req.query.color;
  const queryYear: any = req.query.year;
  const queryFuel: any = req.query.fuel;
  const adverts = await readAdvertsService(
    queryBrand,
    queryModel,
    queryColor,
    queryYear,
    queryFuel
  );

  return res.status(200).json(adverts);
};

const updateAdvertController = async (req: Request, res: Response) => {
  const body = req.body;
  const id = Number(req.params.id);
  const updatedAdvert = await updateAdvertService(body, id);

  return res.status(200).json(updatedAdvert);
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
