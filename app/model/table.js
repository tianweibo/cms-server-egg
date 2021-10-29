const  moment =require('moment');
const sd = require('silly-datetime');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const table=app.model.define('table',{
		table_id:{type:STRING(50),primaryKey:true,},
        indicator_id:{type:INTEGER,comment:'指标id'},
		indicator_name:{type:STRING(255),comment:'指标名称'}, 
		events:{type:STRING(255),comment:'指标下对应的事件codes'},      
		event_names:{type:STRING(255),comment:'事件名称集合'},
		indicator_show_name:{type:STRING(255),comment:'指标显示名称'},            
        indicator_desc:{type:STRING(255),comment:'指标说明'},              
	    time_dimension:{type:STRING(255),comment:'时间维度'},  
		time_dimension_label:{type:STRING(255),comment:'时间维度label'},     
        is_import:{defaultValue:1,type:INTEGER(6),comment:'是否支持导出'},
		state:{defaultValue:1,type:INTEGER(6)},
		show_type:{defaultValue:1,type:INTEGER(6),comment:'1次数0人数'},
		event_ids:{type:STRING(255),comment:'事件id集合'},  
		event_relation:{defaultValue:1,type:INTEGER(11),comment:'事件关系1一对一2相加3比值'},
	}, {
        timestamps: false,
		updatedAt:'update_time',
		underscored: true,
		freezeTableName: true,
		tableName: 'table',
	  })
	return table;
}
