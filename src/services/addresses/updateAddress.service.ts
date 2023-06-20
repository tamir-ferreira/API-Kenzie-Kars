import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { returnAddressSchema } from "../../schemas/addresses.schema";
import {
  IReturnAddress,
  TUpdateAddress,
} from "../../interfaces/addresses.interfaces";
import { Address } from "../../entities/addresses.entity";

const updateAddressService = async (
  data: TUpdateAddress,
  id: number
): Promise<IReturnAddress> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const oldData = await addressRepository.findOneBy({
    id: id,
  });

  const address = addressRepository.create({
    ...oldData,
    ...data,
  });

  await addressRepository.save(address);

  return returnAddressSchema.parse(address);
};

export default updateAddressService;
