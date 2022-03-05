import { sign } from 'jsonwebtoken';
import { BadRequestError, InternalServerError } from 'routing-controllers';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { RegisterPayload } from '../controller/interface/authentication.interface';
import { User } from '../entity/user.entity';
import logger from '../logger';
import { TokenPayload } from '../middleware/authentication';
import { UserRepository } from '../repository/user.repository';
import { env } from '../utility/env';

@Service()
export default class AuthenticationService {
  @InjectRepository(User)
  private readonly userRepo: UserRepository;

  async register(registrationData: RegisterPayload) {
    const { email, password } = registrationData;

    // Check that the email/username does not currently exist
    if (await this.userRepo.emailExists(email)) {
      logger.error('register', 'registration failed due to duplicate login details');

      throw new BadRequestError('Duplicate email');
    }

    try {
      await this.userRepo.save(new User({ email, password }));
    } catch {
      throw new InternalServerError('Something went wrong!');
    }
  }

  generateToken(payload: TokenPayload, expiresIn = '15min') {
    return sign(payload, env('JWT_SECRET'), { expiresIn });
  }
}
