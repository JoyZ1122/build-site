// 引入上一步创建的model
const Users = require('../models/user');
const Image = require('../models/image');
const router = require('koa-router')()
const uploadImage = require('../utils/uploadImg')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
/**
 * 获取个人信息
 */
router.get('/info', async ctx=> {
	let _id = ctx.state.user._id
	let result = await Users.findOne({_id}).select('_id username name email avatar type roles').exec();
	ctx.body = result
})

// router.get('/images', async ctx => {
//   let user_id = ctx.state.user._id
  
// 	let where={
// 		where:{
// 			user_id,
// 		}
// 	}
// 	let result = await Image.findAll()
// 	ctx.body = result
// })
/**
 * 获取对应页面的 图片/视频 列表
 *  */
router.get('/images', async ctx => {
  let { page_id,type } = ctx.query
  // let user_id = ctx.state.user._id
  let order_by = 'createdAt',order_type="DESC"

  let where={}
  if(page_id) where['page_id'] = page_id
  // if(user_id) where['user_id'] = user_id
  if(type){
    where['type'] = type
  }else{
    where['type'] = 'image'
  }

	let result = await Image.findAll({
		attributes:['_id','page_id','url','type','user_id','cover_img'],
    where,
    order:[[order_by,order_type]]

	})
	ctx.body = result
})

// router.get('/update_url', async ctx => {

//   let result = await Image.findAll()
//   // result=result.dataValues
//   let where={
//     _id:item._id
//   }

//   result = result.map(item => item.dataValues.url.indexOf('?x-oss-process=image/format,webp')!=-1?Object.assign({},item.dataValues,
//     {url:item.dataValues.url.substring(0, item.dataValues.url.indexOf("?"))}):item
//   );
//   result.forEach(async item => {
//     await Image.update({...item},{
//       where:{
//         _id:item._id
//       }
//     })
//   });
//   console.log('result',result)
//   ctx.body = result
// })

/**
 * 更新图片地址
 *  */
router.post('/updateImages', async ctx => {
	let {page_id,url,type,cover_img} = ctx.request.body;
	let user_id = ctx.state.user._id
	let data={
		page_id,
		user_id,
		url
	}
	if(type){
		data['type'] = type
	}else{
    data['type'] = 'image'
  }
	if(cover_img){
		data['cover_img'] = cover_img
	}
	let result = await await Image.create(data)
	return ctx.body = result
})


/**
 * 上传文件
 */
// router.post('/uploadImage', async ctx => {
// 	let {page_id} = ctx.request.body;
// 	let user_id = ctx.state.user._id
// 	//imageUrl
// 	let imageUrl = uploadImage(ctx)
// 	// 纪录用户上传得图片
// 	// let author = ctx.state.user._id;
// 	return ctx.body = await Image.create({
// 		url: imageUrl,
// 		// author: author,
// 		_id: mongoose.mongo.ObjectId()
// 	})
// });


module.exports = router
