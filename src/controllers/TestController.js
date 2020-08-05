import {
	RestMapping,
	RestController
} from 'dashaping';

@RestController
@RestMapping('/test')
class TestController {
	
	name="lisi"

	ControllerBeforeMapping(req, res, next){
		console.log('hello')
        next()
    }

	@RestMapping('/user')
	getUser(data, res) {
		console.log(data)
		res.send(data);
	}

	@RestMapping('/age')
	getAge(data, res) {
		console.log(data)
		res.send(data);
	}
}

export default TestController;