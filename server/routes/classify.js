// 引入上一步创建的model
const Classify = require("../models/classify");
const router = require("koa-router")();
const Sequelize = require("sequelize");

/**
 * 获取user分类信息
 */
router.get("/", async (ctx) => {
  // let user_id = ctx.state.user._id
  let where = {}
  // if(user_id){
  //   where['user_id'] = user_id
  // }
  ctx.body = await Classify.findAll({
    attributes:["_id","name"],
    where
  });
});


/**
 * 新增user分类信息
 */
router.post("/", async (ctx) => {
  let user_id = ctx.state.user._id
  let data = ctx.request.body
  ctx.body = await Classify.create(
    {
      ...data,
      user_id
    }
  );
});
/**
 * 修改user分类信息
 */
router.put("/", async (ctx) => {
  // let user_id = ctx.state.user._id
  let {_id,name} = ctx.request.body
  ctx.body = await Classify.update(
    {
      name
    },
    {
      where:{
        _id
      }
    }
  );
});



/**
 * 删除user分类信息
 */
router.delete("/:_id", async (ctx) => {
  let _id = ctx.params._id
  let where = {
    _id
  }
  ctx.body = await Classify.destroy(
    {
      where
    }
  );
});

module.exports = router;
