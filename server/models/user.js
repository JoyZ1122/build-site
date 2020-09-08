
/* eslint-disable no-console */
const Sequelize = require('sequelize')
const db = require('../config/sqlinit.js')


const User = db.define(
	'user', {
		_id: {
			type: Sequelize.UUID,
			primaryKey: true,
			// unique: true,
			defaultValue: Sequelize.UUIDV4,
			// autoIncrement: true
		},
		username: { type: Sequelize.STRING, required: [true,'username不能为空'] },
		password: { type: Sequelize.STRING, required: [true,'password不能为空'] },
		name: { type: Sequelize.STRING, default: '' },
		email: { type: Sequelize.STRING, default: '' },
		avatar: { type: Sequelize.STRING, default: '' },
		roles: { type: Sequelize.STRING, default: '' },
		type: { type: Sequelize.STRING, enum: ['site', 'third'], default: 'site' }, //site用户是网站注册用户, third是第三方登录过来的用户
	}, {
		freezeTableName: true, // 不把表名变复数
		// timestamps: false // 取消默认添加createdAt、updatedAt
	}
)
// 同步模型到数据库
User.sync({
	alter: true
}).catch(err => {
	console.error(err)
	// process.exit()
})

module.exports = User;

