const  moment =require('moment');
const sd = require('silly-datetime');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const card=app.model.define('card',{
		card_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
        indicator_id:{type:STRING(255),comment:'指标id'},
		indicator_name:{type:STRING(255),comment:'指标名称'},         
		indicator_show_name:{type:STRING(255),comment:'指标显示名称'},            
        indicator_desc:{type:STRING(255),comment:'指标说明'},              
	    time_dimension:{type:STRING(20),comment:'时间维度'},  
		time_dimension_label:{type:STRING(20),comment:'时间维度label'},     
        sequential:{type:STRING(20),comment:'环比'},  
		sequential_label:{type:STRING(20),comment:'环比label'},     
        indicator_level:{type:STRING(20),comment:'二级指标'},  
		indicator_level_label:{type:STRING(20),comment:'二级指标label'},               
		state:{defaultValue:1,type:INTEGER(6)},
	}, {
        timestamps: false,
		updatedAt:'update_time',
		underscored: true,
		freezeTableName: true,
		tableName: 'card',
	  })
	return card;
}