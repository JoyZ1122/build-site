const sha1 = require('js-sha1')
const { getData } = require('../utils/http.js')
const {wechat, BToken, BTicket} = require('../utils/wxConfig.js')

const Api = {
	getAccessToken: async ()=>{
		let time = (Date.parse( new Date())/1000)
		try {
			if (BToken.access_token && BToken.time > (time - 7200)) {
				return BToken.access_token
			}else{
				let access = await getData('get', `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wechat.appID}&secret=${wechat.appSecret}`)
				if (access.access_token) {
					BToken.time = (Date.parse( new Date())/1000)
					BToken.access_token = access.access_token
					console.log(access.access_token)
					return access.access_token
				}

			}
		}catch (err){
			console.log(err)
		}
	},
	getTicket: async ()=>{
		let time = (Date.parse( new Date())/1000)
		try {
			if (BTicket.ticket && BTicket.time > (time - 7200)) {
				return BTicket.ticket
			}else{
				let ticket = await getData('get', `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${await Api.getAccessToken()}&type=jsapi`)
				if (ticket.ticket) {
					BTicket.time = (Date.parse( new Date())/1000)
					BTicket.ticket = ticket.ticket
					return ticket.ticket
				}

			}
		}catch (err){
			console.log(err)
		}
	},
	wxJssdk:async (url)=>{
		try {
			let jssdk = {
				appId:wechat.appID,
				nonceStr: Math.random().toString(36).substr(2),
				timestamp: Date.parse(new Date())/1000,
				url: url
			}
			jssdk['signature'] = sha1(`jsapi_ticket=${await Api.getTicket()}&noncestr=${jssdk.nonceStr}&timestamp=${jssdk.timestamp}&url=${jssdk.url}`)

			return jssdk
		}catch (err){
			console.log(err)
		}
	}
}	
module.exports = Api
