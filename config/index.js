
const path = require('path')

exports.API = {
    query: "http://hq.sinajs.cn/list={code}"
};

exports.stockJsonPath = path.join(__dirname, "./stock.json");