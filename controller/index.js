
const request = require('request');
const iconv   = require('iconv-lite');
const config  = require('../config');

exports.queryStock = code => {
	return new Promise((resolve, reject) => {
		request.get({url:config.API.query.replace(/\{code\}/, code), encoding : null}, (err, res, body) => {
			if (err) {
				reject(err)
			}
			else {
				resolve(iconv.decode(body, 'GBK'))
			}
		})
	})
}