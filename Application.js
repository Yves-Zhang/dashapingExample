import {
    Application,
    Run,
    CombinControllers,
    MiddleWares
} from 'dashaping'

import Controllers from './src/controllers'
import LogMiddleWare from './src/middleWares'

@Run
@MiddleWares([LogMiddleWare])
@CombinControllers(Controllers)
class App extends Application{
    
    
}