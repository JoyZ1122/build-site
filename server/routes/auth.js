// 引入上一步创建的model
const Users = require('../models/user');
const router = require('koa-router')();
const jsonwebtoken = require('jsonwebtoken')
const Sequelize = require("sequelize");

/**
 * 用户登录
 */
router.post('/login', async ctx=> {
	let {username,password} = ctx.request.body;
  let result = await Users.findOne({ where:{username} })
	if(!result){
		ctx.status = 202;
		ctx.body = '用户尚未注册，请先注册'
		return
	}
	if(result.password !== password){
		ctx.status = 202;
		ctx.body = '密码错误'
		return
	}
	let userToken = {name: result.username, _id: result._id};
	ctx.body = {
		// msg:'登录成功',
		token: jsonwebtoken.sign(userToken, ctx.state.SECRET,  {expiresIn: '24h'})
	}
})
/**
 * 注册
 */
router.post('/register', async ctx=> {
	let data = ctx.request.body
	let result = await Users.findOne({where:{username: data.username}});
	if(result){
		ctx.status = 202;
		ctx.body = '用户已注册，请直接登陆'
		return
	}
	let userData = await Users.create({
		...data
	})
	let userToken = {name: userData.username, _id: userData._id};
	
	ctx.body = {
		msg:userToken,
		token: jsonwebtoken.sign(userToken, ctx.state.SECRET,  {expiresIn: '24h'})
	}
})


module.exports = router
