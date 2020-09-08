/* eslint-disable no-console */
const Sequelize = require('sequelize')

const {db:{dialect,dbName,username,password,host,port}} = require('../../config')

// 数据库名, mysql的用户名, 密码
const sequelize = new Sequelize(dbName, username, password, {
  host,
  port,
  dialect,
  logging: false,
  // dialectOptions: {
  //   requestTimeout: 999999
  //   // instanceName:'DEV'
  // } //设置MSSQL超时时间
  //连接池设置
  pool: {
    acquire: 3000000,
    max: 100,
    min: 0
    // idle: 10000
  },
  define: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  },
  timezone:"+08:00"
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')

    // sequelize.close()
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
module.exports = sequelize
