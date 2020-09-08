/* eslint-disable no-console */
const Sequelize = require('sequelize')
const db = require('../config/sqlinit.js')


const Classify = db.define(
	'classify', {
		_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_id: {
			type: Sequelize.STRING
		},
		name: {
			type: Sequelize.STRING
		},
	}, {
		freezeTableName: true, // 不把表名变复数
		// timestamps: false // 取消默认添加createdAt、updatedAt
	}
)
// 同步模型到数据库
Classify.sync({
	alter: true
}).catch(err => {
	console.error(err)
	// process.exit()
})

module.exports = Classify;

