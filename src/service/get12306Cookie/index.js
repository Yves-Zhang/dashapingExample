import Http from "../http";

const http = new Http("https");

async function get12306Cookie(UserAgent, ip) {
  const result = await http.get("kyfw.12306.cn", {
    path: "/otn/leftTicket/init",
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "utf-8", //这里设置返回的编码方式 设置其他的会是乱码
      "Accept-Language": "zh-CN,zh;q=0.8",
      Connection: "keep-alive",
      Host: "kyfw.12306.cn",
      "User-Agent": UserAgent,
      "X-Forwarded-For": ip
    },
  });

  const cookiesList = result.headers["set-cookie"];
  let cookStrList = [];
  cookiesList.map((c) => {
    cookStrList.push(c.split(";")[0]);
  });

  return cookStrList.join(";");
}

export default get12306Cookie;
