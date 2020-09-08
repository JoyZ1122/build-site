// 引入上一步创建的model
const Page = require('../models/page')
const router = require('koa-router')()
const Sequelize = require('sequelize')
// const sq = require("../config/sqlinit");
const Op = Sequelize.Op

/**
 * 页面访问地址
 */

router.get('/view/:_id', async (ctx) => {
  let _id = ctx.params._id
  // let user_id = ctx.state.user._id;

  if (!_id) {
    ctx.status = 400
    ctx.body = '页面不存在'
    return
  }
  try {
    let page = await Page.findOne({
      where: { _id },
    })
    await Page.update(
      {
        viewsCount: page.viewsCount + 1,
      },
      {
        where: { _id },
      }
    )
    page = page.dataValues
    if (page) {
      let pageMode = {
        h5: 'h5-swiper',
        longPage: 'h5-long',
        // 'relativePage': 'h5-relative',
        // 'pc': 'pc'
      }
      page['pages'] = JSON.parse(page['pages'])
      await ctx.render(pageMode[page.pageMode], { pageData: page })
    } else {
      ctx.status = 400
      ctx.body = '页面不存在'
      return
    }
  } catch (e) {
    ctx.status = 500
    ctx.type = 'json'
    ctx.body = {
      message: '数据库错误',
      errors: e,
    }
  }
})

/**
 * 获取所有page
 */
router.get('/myPages', async (ctx) => {
  let user_id = ctx.state.user._id
  let { pageMode, type } = ctx.query
  let order_by = 'createdAt',order_type="DESC"

  if (!pageMode) {
    ctx.status = 400
    ctx.body = '页面不存在'
    return
  }
  try {
    let page
    if (type === 'share') {
      page = await Page.findAll({
        where: {
          pageMode: pageMode,
          user_id: user_id,
          isTemplate: { [Op.eq]: true },
          isDelete: { [Op.not]: true }
        },
        order:[[order_by,order_type]]
      })
    } else {
      page = await Page.findAll({
        where: {
          pageMode: pageMode,
          user_id: user_id,
          isTemplate: { [Op.not]: true },
          isDelete: { [Op.not]: true }
        },
        order:[[order_by,order_type]]
      })
    }
    ctx.body = fixData(page)
  } catch (e) {
    ctx.status = 500
    ctx.type = 'json'
    ctx.body = {
      message: '数据库错误',
      errors: e,
    }
  }
})

router.get('/myPages/count', async (ctx) => {
  let { pageMode } = ctx.query
  if (!pageMode) {
    ctx.status = 400
    ctx.body = '页面不存在'
    return
  }
  let user_id = ctx.state.user._id
  let myList = await Page.findAll({
    where: {
      pageMode,
      user_id,
      isTemplate: { [Op.not]: true },
      isDelete: { [Op.not]: true }
    },
  })
  let shareList = await Page.findAll({
    where: {
      pageMode,
      user_id,
      isTemplate: { [Op.eq]: true },
      isDelete: { [Op.not]: true }
    },
  })
  ctx.body = {
    my: fixData(myList).length,
    share: fixData(shareList).length,
  }
})

/**
 * 查找某一页页面数据
 */
router.get('/detail/:_id', async (ctx) => {
  let _id = ctx.params._id
  let user_id = ctx.state.user._id

  let data = await Page.findOne({ where: { _id, user_id } })
  data = data.dataValues
  if (typeof data.pages == 'string') {
    data['pages'] = JSON.parse(data['pages'])
  }
  ctx.body = data
})

/**
 * 新增页面
 */
router.post('/add', async (ctx) => {
  let data = ctx.request.body
  let user_id = ctx.state.user._id
  if (data) {
    data['pages'] = JSON.stringify(data['pages'])
    let res = await Page.create({
      ...data,
      user_id,
    })

    ctx.body = res
  }
})

/**
 * 复制页面
 */
router.post('/copy/:_id', async (ctx) => {
  let { _id } = ctx.params
  let user_id = ctx.state.user._id
  let data = await Page.findOne({ where: { _id } })
  data = data.dataValues
  delete data._id
  let res = await Page.create({
    ...data,
    isPublish: false,
    isTemplate: false,
    members: [],
    user_id: user_id,
  })

  ctx.body = res
})

/**
 * 修改页面
 */
router.post('/update/:_id', async (ctx) => {
  let { _id } = ctx.params
  // let user_id = ctx.state.user._id

  let data = ctx.request.body
  if (typeof data.pages == 'object') {
    data['pages'] = JSON.stringify(data['pages'])
  }
let res = await Page.update(
  { ...data },
  {
    where: { _id },
  }
)
  ctx.body = res
})

/**
 * 删除页面
 */
router.delete('/delete/:_id', async (ctx) => {
  let { _id } = ctx.params

  ctx.body = await Page.update({isDelete:true}, {where: { _id } })
  // ctx.body = await Page.destroy({ where: { _id } })
})

/**
 * 设为模板
 */
router.post('/setTemplate/:_id', async (ctx) => {
  let { _id } = ctx.params
  let data = await Page.findOne({ where: { _id } })
  data = data.dataValues
  ctx.body = await Page.create({
    ...data.toObject(),
    isTemplate: true,
    isPublish: false,
    members: [],
    // _id: Sequelize.UUID,
  })
})

/**
 * 获取我的模板
 */
router.get('/myTemplate', async (ctx) => {
  let user_id = ctx.state.user._id
  let { pageMode } = ctx.query
  let where = {
    where: {
      pageMode,
      user_id,
      isPublish: { [Op.eq]: true },
    },
  }
  let res = await Page.findAll(where)
  ctx.body = fixData(res)
})

/**
 * 发布页面
 */
router.post('/publish/:_id', async (ctx) => {
  let { _id } = ctx.params
  try {
    let res = await Page.update(
      { isPublish: true },
      {
        where: {
          _id,
        },
      },
      {
        runValidators: true,
      }
    )
    ctx.body = res
    // ctx.status = 202

    // ctx.response.body = "更新成功";
    // if (res && res[0]) {
    //   ctx.response.body = "更新成功";
    //   ctx.status = 200;
    // } else {
    //   ctx.response.body = "更新失败";
    //   ctx.status = 400;
    // }
  } catch (e) {
    ctx.status = 500
    ctx.type = 'json'
    ctx.body = {
      message: '数据库错误',
      errors: e,
    }
  }

  // ctx.body = '该功能暂不开放！'
})
/**
 * 添加协同开发人员
 */
// router.post('/shareToUser/:_id', async (ctx) => {
//   let _id = mongoose.mongo.ObjectId(ctx.params._id)
//   let data = ctx.request.body
//   ctx.body = await Page.updateOne(
//     { _id },
//     { $push: { members: data.userIds } },
//     {
//       runValidators: true,
//     }
//   )
// })
/**
 * 删除协同开发人员
 */
// router.post('/deleteShareToUser/:_id', async (ctx) => {
//   let _id = mongoose.mongo.ObjectId(ctx.params._id)
//   let author = ctx.state.user._id
//   // ctx.body = await Page.updateOne({_id}, { $pull: {members: author} }, {
//   // 	runValidators: true
//   // })
//   ctx.body = await Page.updateOne(
//     { _id },
//     {
//       runValidators: true,
//     }
//   )
// })

/**
 * 发布模板到模板市场
 */
router.post('/publishTemplate/:_id', async (ctx) => {
  let _id = ctx.params._id
  let data = await Page.findOne({ where: { _id } })
  data = data.dataValues
  ctx.body = await Page.create({
    ...data.toObject(),
    isTemplate: true,
    isPublish: true,
    members: [],
    // _id: Sequelize.UUID,
  })
  ctx.status = 202
  //   ctx.body = "该功能暂不开放！";
})

/**
 * 获取模板市场模板列表
 */
router.get('/templateShop/list', async (ctx) => {
  const { pageMode } = ctx.query
  if (pageMode) {
    let where = {
      pageMode,
      isTemplate: { [Op.eq]: true },
      isPublish: { [Op.eq]: true },
    }
    let data = await Page.findAll({ where })
    ctx.body = fixData(data)
  } else {
    return
  }
})

const fixData = (data) => {
  return data.map((item) =>
    Object.assign({}, item.dataValues, {
      pages: JSON.parse(item.dataValues.pages),
    })
  )
}

module.exports = router
