const  moment =require('moment');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const attribute=app.model.define('attribute',{
		attribute_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
		attribute_name:{type:STRING(20),comment:"属性名称"},            
		attribute_type:{type:INTEGER(20),comment:'属性代码'},     
		data_type:{type:INTEGER(20),comment:'数据类型'},
		desc:{type:STRING(20),comment:'单位格式说明'},               
		attribute_source:{type:INTEGER(20),comment:'属性来源'},        
        attribute_label:{type:STRING(20),comment:'属性标签'},          
		note:{type:STRING,comment:'备注'},                     
		create_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('create_time')).format(
					'YYYY-MM-DD HH:MM:SS'
				);
			}
		},
		state:{defaultValue:1,type:INTEGER(6)},
		enum_data:STRING(255),                //数据字典的枚举
	}, {
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'attribute',
	  })
	  attribute.associate=function(){
		 app.model.Attribute.belongsToMany(app.model.Event, {
            through: app.model.EventAttribute,
            foreignKey: 'attribute_id',
            otherKey: 'event_id'
        }); 
	  } 
	return attribute;
}