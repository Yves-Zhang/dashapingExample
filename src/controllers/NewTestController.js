import {
	RestMapping,
	RestController
} from 'dashaping';

import say from '../test'

@RestController
class NewTestController {

	name = 'zhangsan'

	ControllerBeforeMapping(req, res, next){
        next()
    }

	@RestMapping('/user')
	getUser(data, res) {
		say()
		res.send(data);
	}
}

export default NewTestController;