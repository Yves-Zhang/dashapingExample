import http from "http";
import https from "https";
import qs from "querystring";
import { resolve } from "path";

function send(option, resolve, reject, http, defaultPort) {
  try{
    http
      .request(
        {
          host: option?.host,
          port: option?.port || defaultPort,
          path: option?.path,
          method: option?.method,
          headers:{
            'Accept':'*/*',
            'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Connection':'keep-alive',
            ...option.headers
            // 'Cookie':'BAIDUID=A78C39414751FF9349AAFB0FDA505058:FG=1; true; __bsi=12248088537049104479_00_7_N_R_33_0303_cca8_Y',
            // 'Host':'m.baidu.com',
            // 'Referer':'https://m.baidu.com/tcx?appui=alaxs&page=detail&gid=4305265392&from=dushu'
          },
          ...option
        },
        function (res) {
          var body = "";
          res.setEncoding("utf-8");
          res.on("data", function (chunk) {
            body += chunk;
          });
          res.on("end", function () {
            resolve({
              body: body,
              headers: res.headers
            });
          });
          res.on("error", function (err) {
            reject(err);
          });
        }
      )
      .end();
  }catch(err){
    reject(err)
  }
}

class Http {
  constructor(type) {
    this.type = type || null;
    this.httpType = type === "https" ? https : http;
    this.option = {}
  }
  createPromise(host, option, method) {
    const defaultPort = this.type === "https" ? '443' : '80'
    return new Promise((resolve, reject) => {
      send(
        {
          method: method,
          host: host,
          ...option,
        },
        resolve,
        reject,
        this.httpType,
        defaultPort
      );
    });
  }

  setHeader(headers){
    this.option.headers = {
      ...headers
    }
  }

  get(host, option) {
    return this.createPromise(host, option || this.option, "GET");
  }

  post(host, option) {
    return this.createPromise(host, option || this.option, "POST");
  }
}

export default Http;
