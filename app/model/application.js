const  moment =require('moment');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const application=app.model.define('application',{
		/* application_id:{type: STRING,
			unique: true,
			primaryKey: true,
			allowNull: false,
			defaultValue: () => {
			  return ctx.helper.UUID()
	    	}
	    },  */
		application_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
		application_name:{type:STRING(20),comment: '应用名称'},
		application_code:{type:STRING(20),comment:'应用代码'},          
		application_version:{type:STRING(20),comment:'应用版本'},       
		application_platform:{type:INTEGER(20),comment:'应用平台'},     
		application_dep_platform:{type:INTEGER(20),comment:'应用部署平台'},  
		application_type:{type:INTEGER(20),comment:'应用类型'},  
		application_label:{type:INTEGER(20),comment:'应用标签'}, 
		note:{type:STRING,comment:'备注'},                       
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