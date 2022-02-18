import { Controller, Get } from "routing-controllers";

@Controller()
export class UserController {
    @Get('/')
    test() {
        return "lol";
    }
}