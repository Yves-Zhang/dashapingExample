import 'colors'

const LogMiddleWare = (req, res, next) => {
    console.log('\n')
    console.log("Message come in！！！".green)
    console.log("router: ", `${req.url}`.green)
    console.log("method: ", `${req.method}`.green)
    console.log(`query:`, `${JSON.stringify(req.query)}`.green)
    console.log(`body:`, `${JSON.stringify(req.body)}`.green)
    console.log('\n')
    next()
}

export default LogMiddleWare