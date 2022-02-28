const  moment =require('moment');
const  crypto =require('crypto');
const sd = require('silly-datetime');
module.exports=app=>{
	const {STRING,INTEGER,DATE}=app.Sequelize;
	const merchant=app.model.define('merchant',{
		id:{
			type:INTEGER,
			primaryKey:true,
			autoIncrement:true,
		},
		platform:{
			type:STRING,
		},
		merchant_name:{
			type:STRING,
		},
		merchant_id:{
            type:INTEGER,
        },
		state:{defaultValue:1,type:INTEGER(6)},
		remark:{
			type:STRING
		}
	},{
		freezeTableName: true, // 使用数据库里的真实表名
		underscored: true, // 不使用下划线
		tableName:'merchant'
	});
	
	return merchant;
}