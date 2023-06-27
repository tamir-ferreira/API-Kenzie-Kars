import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { UserRequest, UserResponse } from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { userSchemaResponse } from "../../schemas/users.schemas";
import { Address } from "../../entities/addresses.entity";
import { returnAddressSchema } from "../../schemas/addresses.schemas";

const createUserService = async (
  userData: UserRequest
): Promise<UserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const dataAddress = userData.address;

  const createAddress = addressRepository.create(dataAddress!);

  await addressRepository.save(createAddress);

  const newAddress = returnAddressSchema.parse(createAddress);

  const findAddress: Address | null = await addressRepository.findOneBy({
    id: newAddress.id,
  });

  const userColor: string =
    "#" +
    Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, "0");

  const user: User = userRepository.create({
    ...userData,
    address: findAddress!,
    color: userColor,
  });

  await userRepository.save(user);

  const userReturn: UserResponse = userSchemaResponse.parse(user);

  return userReturn;
};

export default createUserService;
