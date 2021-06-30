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
		platform_app:{type:STRING(20),comment: '应用名称'},
		platform_app_code:{type:STRING(20),comment:'应用代码'},          
		platform_app_version:{type:STRING(20),comment:'应用版本'},       
		platform_business:{type:STRING(20),comment:'应用平台'},
		platform_business_label:{type:STRING(20),comment:'应用平台label'},     
		application_dep_platform:{type:STRING(20),comment:'应用部署平台'}, 
		application_dep_platform_label:{type:STRING(20),comment:'应用部署平台label'},  
		application_type:{type:STRING(20),comment:'应用类型'},  
		application_type_label:{type:STRING(20),comment:'应用类型label'},  
		application_label:{type:STRING(60),comment:'应用标签'}, 
		application_label_label:{type:STRING(60),comment:'应用标签label'},
		application_use:{defaultValue:1,type:INTEGER(2),comment:'是否启用'}, 
		is_interactive:{defaultValue:1,type:INTEGER(2),comment:'是否互动应用'}, 
		note:{type:STRING,comment:'备注'},   
		create_time:{
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
		update_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('update_time')).format(
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