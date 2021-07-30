const  moment =require('moment');
const sd = require('silly-datetime');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const trend=app.model.define('trend',{
		trend_id:{type:STRING(50),primaryKey:true},
        indicator_id:{type:INTEGER,comment:'指标id'},
		indicator_name:{type:STRING(255),comment:'指标名称'},         
		indicator_show_name:{type:STRING(255),comment:'指标显示名称'},            
        indicator_desc:{type:STRING(255),comment:'指标说明'},              
	    time_scope:{type:STRING(20),comment:'时间范围'},  
		state:{defaultValue:1,type:INTEGER(6)},
	}, {
        timestamps: false,
		updatedAt:'update_time',
		underscored: true,
		freezeTableName: true,
		tableName: 'trend',
	  })
	return trend;
}