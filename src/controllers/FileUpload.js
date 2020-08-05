import {
    RestMapping,
    RestController
} from 'dashaping';

import fs from 'fs'
import multer from 'multer'

const path = process.cwd()

@RestController
class FileUploadController {

    ControllerBeforeMapping(req, res, next){
        if(req.url === '/file_upload'){
            multer({dest: 'upload_tmp'}).any()(req, res, next)
        }
    }

    @RestMapping({
        value: '/file_upload',
        method: 'post'
    })
    uploadFiles(data, res, {req}) {
        try{
            fs.readFile(req.files[0].path, function (err, data) {
                if (err) {
                    res.send({
                        msg: 'upload error',
                    });
                    console.log('Error');
                } else {
                    const dir_file = path + '/resourceFiles/' + req.files[0].originalname
                    fs.writeFile(dir_file, data, function (err) {
                        const obj = {
                            msg: 'upload success',
                            filename: req.files[0].originalname
                        }
                        res.send(JSON.stringify(obj));
                    })
                }
            })
        }catch(err){
            res.send({
                msg: err,
            });
        }
    }
}

export default FileUploadController;