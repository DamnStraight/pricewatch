import { Interface } from "readline";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/user.entity";
import logger from "../logger";
import { UserRepository } from "../repository/user.repository";

export interface RegistrationData {
  email: string
  password: string
}

@Service()
export default class UserService {
  @InjectRepository(User)
  private readonly userRepo: UserRepository;

  async register(registrationData: RegistrationData) {
    const { email, password } = registrationData;

    // Check that the email/username does not currently exist
    if (await this.userRepo.emailExists(email)) {
      logger.error(
        "register",
        "registration failed due to duplicate login details"
      );
      
      throw new Error("Duplicate username or email");
    }

    // Save the user and return the result
    return await this.userRepo.save(new User({ email, password }));
  }
}
