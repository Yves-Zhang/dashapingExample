import {
	RestMapping,
	RestController
} from 'dashaping';

import newTest from '../service/newTestService'

@RestController
class NewTestController {

	ControllerBeforeMapping(req, res, next){
        next()
    }

	@RestMapping('/user')
	getUser(data, res) {
		console.log(data)
		// newTest()
		res.send(data);
	}
}

export default NewTestController;