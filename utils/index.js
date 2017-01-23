const controller = require('../controller')

exports.isArray = data => {
	return Object.prototype.toString.call(data) === 'object Array'
}

exports.isExist = (data, code) => {
	return data.some(item => item.code === code)
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

 	return str
}