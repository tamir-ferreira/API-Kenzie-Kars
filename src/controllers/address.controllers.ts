import { Request, Response } from "express";
import updateAddressService from "../services/addresses/updateAddress.service";

export const updateAddressController = async (req: Request, res: Response) => {
  const body = req.body;
  const id = Number(req.params.id);
  const updatedAddress = await updateAddressService(body, id);

  return res.status(200).json(updatedAddress);
};
