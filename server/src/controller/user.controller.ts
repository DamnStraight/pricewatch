import { Authorized, CurrentUser, Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { User } from '../entity/user.entity';

@Service()
@JsonController('/user')
export default class UserController {
  @Authorized()
  @Get('/me')
  me(@CurrentUser() me?: User) {
    return me;
  }
}
