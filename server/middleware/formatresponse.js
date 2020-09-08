module.exports = async (ctx, next) => {
	await next().then(() => {
		if (ctx.status === 200) {
			if(typeof ctx.body == 'string'){
				ctx.response.body = ctx.body
			
			}else{
				ctx.body = {
					message: '成功',
					code: 200,
					body: ctx.body,
					status: true
				}
			}
		} else if (ctx.status === 201) { // 201处理模板引擎渲染

		} else if (ctx.status === 401) { // 201处理模板引擎渲染
      ctx.body = '未授权'
    } else if (ctx.status === 500) { // 500
      ctx.status = 401
			// ctx.body = {
			// 	message: ctx.body || '接口异常，请重试',
			// 	body: '登录过期，请重新登录',
			// 	status: false
			// }
		}else{

			ctx.body = {
				message: ctx.body || '接口异常，请重试',
				code: ctx.status,
				body: '接口请求失败',
				status: false
			}
		}
	}).catch((err) => {
		
		if (err.status === 401) {
			// ctx.status = 401;
			// ctx.body = {
			// 	code: 401,
			// 	status: false,
			// 	message: '登录过期，请重新登录'
			// }
		} else {
			throw err
		}
	})
}
