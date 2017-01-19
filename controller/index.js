const fs      = require('fs')
const request = require('request')
const iconv   = require('iconv-lite')
const utils   = require('../utils')
const config  = require('../config')

exports.queryStock = code => {
	return new Promise((resolve, reject) => {
		let url = config.API.query.replace(/\{code\}/, code)
		request.get({url: url, encoding : null}, (err, res, body) => {
			if (err) {
				reject(err)
			}
			else {
				resolve(iconv.decode(body, 'GBK'))
			}
		})
	})
}

exports.addStock = codes => {
	return new Promise((resolve, reject) => {
		let rights = wrongs = exists = []
		let a
		codes.split(',').forEach(code => {

			   a = utils.isExist(code)  // 重复readfile 优化
				 .then(() => {
				 	let ret = utils.affiliationPad(code)
					let arr = ret ? rights : wrongs
					arr.push(code)
				 })
				 .catch(() => {
				 	exists.push(code)
				 })
		})

		a.then(() => {
			console.log(rights)
			console.log(wrongs)
			console.log(exists)
		})


	})
}

exports.readStockJson = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(config.stockJsonPath, 'utf-8', (err, data) => {
			err ? reject(err) : resolve(JSON.parse(data))
		})
	})
}

exports.wirteStockJson = str => {
	return Promise((resolve, reject) => {
		fs.writeFile(config.stockJsonPath, str, (err) => {
			err ? reject(err) : resolve()
		})
	})
}



// function writeStockCodeFile (data) {
// 	return new Promise((resolve,reject) => {
// 		fs.writeFile(config.stockDataFile, data, (err) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve();
// 			}
// 		})
// 	})
// }