import { RestMapping, RestController } from "dashaping";
import queryTickes from "../service/12306Querytickes";
import get12306Cookie from "../service/get12306Cookie";
import { randomHead, returnIp } from "../service/forgeHeader";

@RestController
@RestMapping("/test")
class TestController {
  name = "lisi";

  ControllerBeforeMapping(req, res, next) {
    next();
  }

  @RestMapping("/user")
  getUser(data, res) {
    console.log(data);
    res.send(data);
  }

  @RestMapping("/age")
  async getAge(data, res) {
    const usrAgent = randomHead()
    const ip = returnIp()
    const cookieRet = await get12306Cookie(usrAgent, ip);
    const ret = await queryTickes(cookieRet, usrAgent, ip);
    res.send(ret);
  }
}

export default TestController;
