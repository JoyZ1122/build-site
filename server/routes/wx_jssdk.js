

const { wxJssdk } = require('../utils/wxApi.js')
const router = require("koa-router")();

router.get("/wx_jssdk", async (ctx) => {
	ctx.body = await await wxJssdk(ctx.query.url)
  });
  

// module.exports = {
// 	type:'get',
// 	methods: async ctx => {
// 		ctx.body = await wxJssdk(ctx.query.url)
// 	}
// }
module.exports = router;