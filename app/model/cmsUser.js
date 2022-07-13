const  crypto =require('crypto');
const sd = require('silly-datetime');
module.exports=app=>{
	const {STRING,INTEGER,DATE}=app.Sequelize;
	const cmsUser=app.model.define('cmsUser',{
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
		state:{defaultValue:1,type:INTEGER(2),comment:'是否启用'},
		avatar:{
			type:STRING,
		},
		phone:{
			type:STRING,
		},
        email:{
			type:STRING,
		},
		status:{defaultValue:1,type:INTEGER(11)},
		create_time:{
			type:DATE,
			get(){
				return sd.format(this.getDataValue('create_time'),
					'YYYY-MM-DD HH:mm:ss'
				);
			},defaultValue(){
				var sj = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
				return sj
			}
		},
		update_time:{
			type:DATE,
			get(){
				return sd.format(this.getDataValue('create_time'),
					'YYYY-MM-DD HH:mm:ss'
				);
			},
			defaultValue(){
				var sj = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
				return sj
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
		tableName:'cmsUser'
	});
	cmsUser.prototype.validPassword = function (password) {
		//密码验证
        let deBase64 = Buffer.from(password, 'base64').toString();
        var md5 = crypto.createHash('md5');
		let userpass = md5.update(deBase64).digest('hex').toUpperCase();
        return this.password === userpass; 
    }
	return cmsUser;
}