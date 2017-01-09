
exports.affiliationPad = code => {
 	try {
 		let key = code.match(/^(\d{3})\d{3}$/)[1];
 		let str = '';
 		
 		switch(key) {
 			case '600':
 			case '601':
 				str = 'sh';
 				break;
 			case '000':
 			case '002':
 			case '300':
 				str = 'sz';
 				break
 			default:
 				console.log('please input right code')
 				break
 		}

 		return `${str+code}`;
 	}
 	catch (e) {
 		console.log('please input right code')
 	}
}