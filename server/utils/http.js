const Axios = require('axios')

const Api = {
	getData:(type, url)=>{
		return new Promise((resolve, reject)=>{
			Axios[type](encodeURI(url))
			.then(res=>{
				resolve(res.data)
			})
			.catch(err=>{
				reject(err)
			})
		}) 
	}

}
module.exports = Api