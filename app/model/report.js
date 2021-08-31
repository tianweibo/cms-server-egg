const  moment =require('moment');
const sd = require('silly-datetime');
module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const report=app.model.define('report',{
		report_id:{type:INTEGER,primaryKey:true,autoIncrement:true},
        report_name:{type:STRING(255),comment:'报表名称'},
		create_time:{
			type:DATE,
			get(){
				return moment(this.getDataValue('create_time')).format(
					'YYYY-MM-DD HH:MM:SS'
				);
			},defaultValue(){
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
		state:{defaultValue:1,type:INTEGER(6)},
		data_state:{defaultValue:0,type:INTEGER(6),comment:'数据状态'},
	}, {
        timestamps: false,
		updatedAt:'update_time',
		underscored: true,
		freezeTableName: true,
		tableName: 'report',
	  })
      report.associate=function(){
		//app.model.Report.hasOne(app.model.Application,{foreignKey:'report_id'})
		 app.model.Report.belongsTo(app.model.Application, {
            foreignKey: 'application_id',
            targetKey: 'report_id'
        }); 
		//app.model.Application.hasMany(app.model.Report, {foreignKey: 'application_id', targetKey: 'report_id'}); */
	  } 
	return report;
}