import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi';
import UserService from '../service/user.service';

@Service()
@Controller('/authentication')
export default class AuthenticationController {
  constructor(private readonly userService: UserService) {}

  @Get('/register')
  async register() {
    try {
      await this.userService.register({ email: 'test', password: 'test' });
      return { data: 'test' };
    } catch {
      return 'Error';
    }
  }
}
