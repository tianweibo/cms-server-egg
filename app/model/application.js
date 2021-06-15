const  moment =require('moment');
const sd = require('silly-datetime');
const { v4: uuidv4 } = require('uuid');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT,UUID}=app.Sequelize;
	const application=app.model.define('application',{
		/* application_id:{
			type: UUID,
        unique: true,
        primaryKey: true,
        allowNull: false,
		defaultValue:uuidv4().replace(/-/g, '')
	    },  */
		application_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
		application_name:{type:STRING(20),comment: '应用名称'},
		application_code:{type:STRING(20),comment:'应用代码'},          
		application_version:{type:STRING(20),comment:'应用版本'},       
		application_platform:{type:STRING(20),comment:'应用平台'},     
		application_dep_platform:{type:STRING(20),comment:'应用部署平台'},  
		application_type:{type:STRING(20),comment:'应用类型'},  
		application_label:{type:STRING(20),comment:'应用标签'}, 
		application_use:{defaultValue:1,type:INTEGER(2),comment:'是否启用'}, 
		is_interactive:{defaultValue:1,type:INTEGER(2),comment:'是否互动应用'}, 
		note:{type:STRING,comment:'备注'},   
		create_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('create_time')).format(
					'YYYY-MM-DD HH:MM:SS'
				);
			}
		},
		update_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('create_time')).format(
					'YYYY-MM-DD HH:MM:SS'
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
		apply_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('apply_time')).format(
					'YYYY-MM-DD HH:MM:SS'
				);
			}
		},
		state:{defaultValue:1,type:INTEGER(6)},
	}, {
        timestamps: false,
		underscored: false,
		freezeTableName: true,
		tableName: 'application',
	  })
	  application.associate=function(){
		 app.model.Application.belongsToMany(app.model.Indicator, {
            through: app.model.ApplicationIndicator,
            foreignKey: 'application_id',
            otherKey: 'indicator_id'
        }); 
	  } 
	return application;
}