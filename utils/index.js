const controller = require('../controller')

exports.isExist = code => {
	return new Promise((resolve, reject) => {
		controller
			.readStockJson()
			.then(ret => {
				let flag = ret.data.some(val => val === code)
				flag ? reject(code) : resolve(code)
			})
	})
	
}

exports.affiliationPad = code => {
 	
	let key = code.match(/^(\d{3})\d{3}$/)[1];
	let str = '';
	
	switch(key) {
		case '600':
		case '601':
			str = 'sh'
			break;
		case '000':
		case '002':
		case '300':
			str = 'sz'
			break
		default:
			return false
			break
	}

 	return `${str+code}`
}