

const sha1 = require('js-sha1')
const router = require("koa-router")();
const { wxJssdk } = require('../utils/wxApi.js')

const config = require('../utils/wxConfig.js')

//获取wx jssdk
router.get("/wechat", async (ctx) => {
	ctx.body = await await wxJssdk(ctx.query.url)
  });
  


  module.exports = router;

