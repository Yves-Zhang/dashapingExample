import Http from "../http";

const http = new Http("https");

async function queryTickes(cookies, UserAgent, ip) {
  const result = await http.get("kyfw.12306.cn", {
    path:
      "/otn/leftTicket/query?leftTicketDTO.train_date=2020-08-28&leftTicketDTO.from_station=SHH&leftTicketDTO.to_station=TJP&purpose_codes=ADULT",
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "utf-8", //这里设置返回的编码方式 设置其他的会是乱码
      "Accept-Language": "zh-CN,zh;q=0.8",
      Connection: "keep-alive",
      Cookie: cookies,
      Host: "kyfw.12306.cn",
      "User-Agent": UserAgent,
      "X-Forwarded-For": ip
    },
  });

  const json = JSON.parse(result.body).data.result;
  const list = [];
  json.map((item) => {
    let newList = [];
    item.split("|").map((sub) => {
      newList.push(sub);
    });
    list.push(newList);
  });
  return list;
}

export default queryTickes;
