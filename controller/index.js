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
		let rights = [],
			wrongs = [],
			exists = [];

		this.readStockJson()
			.then(stocks => {
				codes = codes.indexOf(',') === -1 ? [codes] : codes.split(',')

				codes.forEach(code => {
					if (stocks) {
						let isExist = utils.isExist(stocks, code)

						if (isExist) {
							exists.push(code)
							return true
						}
					}

					let prefix = utils.affiliationPad(code)

					if (!prefix) {
						wrongs.push(code)
						return true
					}

					rights.push(code)

					stocks.push({
						code  : code,
						prefix: prefix
					})
				})

				return this.wirteStockJson(JSON.stringify(stocks))
			})
			.then(() => {
				rights && rights.length && console.log(`成功添加${rights.join(',')}`)
				exists && exists.length && console.log(`已有代码${exists.join(',')}`)
				wrongs && wrongs.length && console.log(`错误代码${wrongs.join(',')}`)
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
	return new Promise((resolve, reject) => {
		fs.writeFile(config.stockJsonPath, str, (err) => {
			err ? reject(err) : resolve()
		})
	})
}
