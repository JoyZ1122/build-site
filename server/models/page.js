/* eslint-disable no-console */
const Sequelize = require('sequelize')
const db = require('../config/sqlinit.js')
const User = require('./user.js')

const Page = db.define(
  'page',
  {
    _id: {
      type: Sequelize.UUID,
      // unique: true,
      // autoIncrement: true,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    title: { type: Sequelize.STRING, default: '场景' },
    coverImage: { type: Sequelize.STRING, default: '' },
    classify: { type: Sequelize.STRING, default: '月嫂' }, // 分类
    description: {
      type: Sequelize.STRING,
      default: '我做了一个超酷炫的H5，快来看看吧。',
    },
    shareConfig: {
      type: Sequelize.JSON,
      defaultValue: {},
    },

    pages: { type: Sequelize.TEXT('long') }, //用于原始数据存储
    script: { type: Sequelize.STRING, default: '' }, // 第三方脚本插件
    user_id: {
      type: Sequelize.STRING,
      // ref: "user",
    },
    width: { type: Sequelize.INTEGER, default: 375 }, // 页面宽
    height: { type: Sequelize.INTEGER, default: 611 }, // 页面高度
    pageMode: { type: Sequelize.STRING, default: 'h5' }, // 渲染模式
    flipType: { type: Sequelize.INTEGER, default: 0 }, // 翻页模式
    slideNumber: { type: Sequelize.BOOLEAN, default: false }, // 翻页是否显示页码翻页指示
    // add_time: Sequelize.INTEGER,
    // up_time: Sequelize.INTEGER,
    status: { type: Sequelize.INTEGER, default: 1 }, // 0 不允许访问， 1 允许访问
    isPublish: { type: Sequelize.BOOLEAN, default: false }, //  发布状态
    isTemplate: { type: Sequelize.BOOLEAN, default: false },
    isDelete: { type: Sequelize.BOOLEAN, default: false },
    wx: {
      type: Sequelize.JSON,
    },
    count: {
      type: Sequelize.JSON,
    },
    viewsCount: { type: Sequelize.INTEGER, default: 0 },
    // members: [Sequelize.INTEGER], // 共享人员列表
    createdAt: { type: Sequelize.DATE, default: Sequelize.NOW },   
    updatedAt: Sequelize.DATE,
  },
  {
    freezeTableName: true, // 不把表名变复数
    // timestamps: false, // 取消默认添加createdAt、updatedAt
  }
)

// Page.belongsTo(User, {
//   foreignKey: 'user_id',
//   sourceKey: '_id',
//   as: 'user_info',
// })

// // 同步模型到数据库
Page.sync({
  alter: true,
}).catch((err) => {
  console.error(err)
  // process.exit()
})

module.exports = Page
