const  moment =require('moment');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const event=app.model.define('event',{
		event_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
		event_name:{type:STRING(255),unique: true,comment:'事件名称'},            
        event_code:{type:STRING(255),comment:'事件代码'},            
		event_trigger_mode:{type:STRING(255),comment:'触发类型'},         
		trigger_time:{type:STRING(255),comment:'触发时机'},          
        event_label:{type:STRING(255),comment:'事件标签'},           
		note:{type:STRING,comment:'备注'},  
        general_attr:{type:TEXT,comment:'通用属性'},                 
		create_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('create_time')).format(
					'YYYY-MM-DD HH:MM:SS'
				);
			}
		},
		state:{defaultValue:1,type:INTEGER(6)},
	}, {
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'event',
	  })
	  event.associate=function(){
		app.model.Event.belongsToMany(app.model.Attribute, {
            through: app.model.EventAttribute,
            foreignKey: 'event_id',
            otherKey: 'attribute_id'
        });
        app.model.Event.belongsToMany(app.model.Indicator, {
            through: app.model.IndicatorEvent,
            foreignKey: 'event_id',
            otherKey: 'indicator_id'
        }); 
	  } 
	return event;
}