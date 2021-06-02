const  moment =require('moment');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const indicator=app.model.define('indicator',{
		indicator_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
		indicator_name:{type:STRING(20),comment:'指标名称'},         
		indicator_type:{type:INTEGER(20),comment:'指标类型'},     
		indicator_level:{type:INTEGER(20),comment:'一级指标'},   
		indicator_code:{type:STRING(20),comment:'指标代码'},         
		indicator_label:{type:INTEGER(20),comment:'指标标签'},        
		note:{type:STRING,comment:"备注"},                      
		create_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('create_time')).format(
					'YYYY-MM-DD HH:MM:SS'
				);
			}
		},
		state:{defaultValue:1,type:INTEGER(6)},
		dimension_general_attr:{type:INTEGER(20),comment:'自定义维度属性'},   
		dimension_general_name:{type:STRING(20),comment:'自定义维度名称'},    
		dimension_custom_attr:{type:INTEGER(20),comment:'通用维度属性'},   
		dimension_custom_name:{type:STRING(20),comment:'通用维度名称'},  
	}, {
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'indicator',
	  })
	  indicator.associate=function(){
		app.model.Indicator.belongsToMany(app.model.Application, {
            through: app.model.ApplicationIndicator,
            foreignKey: 'indicator_id',
            otherKey: 'application_id'
        });
        app.model.Indicator.belongsToMany(app.model.Event, {
            through: app.model.IndicatorEvent,
            foreignKey: 'indicator_id',
            otherKey: 'event_id'
        }); 
	  } 
	return indicator;
}