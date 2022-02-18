import { Controller, Get } from "routing-controllers";
import { Service } from "typedi";
import UserService from "../service/user.service";

@Controller() @Service()
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/register")
  async register() {
    await this.userService.register({ email: "test", password: "test" });

    return "test";
  }
}
