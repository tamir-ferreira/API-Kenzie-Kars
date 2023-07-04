import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { UserResponse, UserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities/users.entity";
import { userSchemaResponse } from "../../schemas/users.schemas";
import { Address } from "../../entities/addresses.entity";

const updateUserService = async (
  data: UserUpdate,
  id: number
): Promise<UserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const completeOldData = await userRepository.find({
    where: { id: id },
    relations: { address: true },
  });

  const addressOldData = completeOldData[0].address;

  const newAddress = addressRepository.create({
    ...addressOldData,
    ...data.address,
  });

  await addressRepository.save(newAddress);

  const newObj = { ...data, address: newAddress };

  const updatedUser = userRepository.create({
    ...completeOldData[0],
    ...newObj,
  });

  await userRepository.save(updatedUser);

  return userSchemaResponse.parse(updatedUser);
};

export default updateUserService;
