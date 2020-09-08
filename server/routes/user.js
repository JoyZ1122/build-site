// 引入上一步创建的model
// const mongoose = require("mongoose");
const Users = require("../models/user");
const Classify = require("../models/classify");
const router = require("koa-router")();
const Sequelize = require("sequelize");

router.get("/list", async (ctx) => {
  ctx.body = await Users.find();
});

/**
 * 获取user用户信息
 */
router.get("/info/:_id", async (ctx) => {
  let _id = ctx.params._id;
  if (!_id) {
    ctx.status = 400;
    ctx.body = "用户不存在";
    return;
  }

  try {
    const res = await Users.findOne({
      where: { _id },
    });
    if (res) {
      ctx.type = "json";
      ctx.body = res;
    } else {
      ctx.status = 400;
      ctx.body = "用户不存在";
      return;
    }
  } catch (e) {
    ctx.status = 500;
    ctx.type = "json";
    ctx.body = {
      message: "数据库错误",
      errors: e,
    };
  }

});

router.get('/info', async ctx=> {
  let {_id} = ctx.state.user
	ctx.body = await Users.findOne({
    attributes:['_id','avatar','email','username','createdAt'],
    where:{_id}
  });
})
/**
 * 关键字查询用户列表
 */
router.get("/list/search", async (ctx) => {
  let keywords = ctx.request.keywords;
  const reg = new RegExp(keywords, "i");
  ctx.body = await Users.find()
    .where("username")
    .regex(reg)
    .where("name")
    .regex(reg);
});

// 创建用户
router.post("/", async (ctx) => {
  let data = ctx.request.body;
  let result = await Users.create({
    ...data,
  });
  ctx.body = result;
});
/**
 * 用户登录
 */
router.post("/login", async (ctx) => {
  let {username,password} = ctx.request.body;
  let result = await Users.findOne({ where:{username} })
  if (!result) {
    ctx.status = 202;
    ctx.body = "用户尚未注册，请先注册";
  }
  if (result.password !== password) {
    ctx.status = 202;
    ctx.body = "密码错误";
  }
  ctx.body = result;
});

/**
 * 修改更新用户信息
 */
// router.post("/:_id", async (ctx) => {
//   let _id = mongoose.mongo.ObjectId(ctx.params._id);
//   let data = ctx.request.body;
//   let result = await Users.update(
//     { _id },
//     { $set: data },
//     {
//       runValidators: true,
//     }
//   );
//   ctx.body = result.select("username name email avatar type roles").exec();
// });

// router.delete("/:_id", async (ctx) => {
//   let _id = mongoose.mongo.ObjectId(ctx.params._id);
//   ctx.body = await Users.deleteOne({ _id });
// });

module.exports = router;
