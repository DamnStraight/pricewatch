import Joi from 'joi';
import {
  BadRequestError,
  Body,
  JsonController,
  OnUndefined,
  Post
} from 'routing-controllers';
import { Service } from 'typedi';
import AuthenticationService from '../service/authentication.service';
import { RegisterPayload } from './interface/authentication.interface';

@Service()
@JsonController('/authentication')
export default class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  @OnUndefined(200)
  async register(@Body() data: RegisterPayload) {
    const schema = Joi.object<RegisterPayload>({
      email    : Joi.string().trim().email().required(),
      password : Joi.string().trim().min(8).max(64).required(),
    });

    const { error, value } = schema.options({ stripUnknown: true }).validate(data);

    if (error || value === undefined) {
      throw new BadRequestError(error?.message);
    }

    return await this.authenticationService.register(value);
  }
}
