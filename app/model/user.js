const  moment =require('moment');
const  crypto =require('crypto');
module.exports=app=>{
	const {STRING,INTEGER,DATE}=app.Sequelize;
	const user=app.model.define('user',{
		id:{
			type:INTEGER,
			primaryKey:true,
			autoIncrement:true,
		},
		username:{
			type:STRING,
		},
		realname:{
			type:STRING,
		},
		password:{
			type:STRING(200),
			set:function(password){
				var pas=crypto.createHash('md5').update(Buffer.from(password,'base64').toString()).digest('hex').toUpperCase();
				this.setDataValue("password", pas);
			},
			get:function(){
				return this.getDataValue('password')
			}
		},
		user_use:{defaultValue:1,type:INTEGER(2),comment:'是否启用'},
		avatar:{
			type:STRING,
		},
		phone:{
			type:STRING,
		},
		role:{defaultValue:1,type:INTEGER(11)},
		role_name:{defaultValue:'普通用户',type:STRING(11)},
		status:{defaultValue:1,type:INTEGER(11)},
		created_at:{
			type:DATE,
			get(){
				return moment(this.getDataValue('created_at')).format(
					'YYYY-MM-DD HH:MM:SS'
				);
			}
		},
		updated_at:{
			type:DATE,
			get(){
				return moment(this.getDataValue('update_time')).format(
					'YYYY-MM-DD HH:MM:SS'
				);
			}
		},
		update_people:{
			type:STRING(255),
			comment:'更新人'
		},
		create_people:{
			type:STRING(255),comment:'创建人'
		},
		remark:{
			type:STRING
		}
	},{
		freezeTableName: true, // 使用数据库里的真实表名
		underscored: true, // 不使用下划线
		tableName:'user'
	});
	user.prototype.validPassword = function (password) {
		//密码验证
        let deBase64 = Buffer.from(password, 'base64').toString();
        var md5 = crypto.createHash('md5');
		let userpass = md5.update(deBase64).digest('hex').toUpperCase();
        return this.password === userpass; 
    }
	user.associate=function(){
       
	};
	return user;
}