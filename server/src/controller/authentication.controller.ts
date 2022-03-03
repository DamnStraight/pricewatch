import { Body, Controller, Get, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import logger from '../logger';
import UserService, { RegistrationData } from '../service/user.service';
import Joi from 'joi'

@Service()
@JsonController('/authentication')
export default class AuthenticationController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() data: RegistrationData) {
    try {
      logger.info(data);
      return await this.userService.register(data);
    } catch {
      return 'Error';
    }
  }
}
