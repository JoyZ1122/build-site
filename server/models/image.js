/* eslint-disable no-console */
const Sequelize = require('sequelize')
const db = require('../config/sqlinit.js')


const Image = db.define(
	'image', {
		_id: {
			type: Sequelize.UUID,
			// autoIncrement: true,
			unique: true,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		user_id: {
			type: Sequelize.STRING
		},
		page_id: {
			type: Sequelize.STRING
		},
		url: {
			type: Sequelize.STRING
		},
		type: {
			type: Sequelize.STRING
		},
		cover_img: {
			type: Sequelize.STRING
		},
		// wx_img: {
		// 	type: Sequelize.STRING
		// },
		// small_img: {
		// 	type: Sequelize.STRING
		// }
	}, {
		freezeTableName: true, // 不把表名变复数
		// timestamps: false // 取消默认添加createdAt、updatedAt
	}
)
// 同步模型到数据库
Image.sync({
	alter: true
}).catch(err => {
	console.error(err)
	// process.exit()
})

module.exports = Image;
