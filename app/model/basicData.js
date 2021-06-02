module.exports=app=>{
    const {STRING,INTEGER,DATE,TEXT}=app.Sequelize;
	const basicData=app.model.define('basicData',{
		fid:STRING(20),
        id:{type:INTEGER,primaryKey:true,autoIncrement:true},
        fname:STRING(20),
		key:STRING(20),
        value:STRING(20),
		state:{defaultValue:1,type:INTEGER(11)},
		bz:STRING
	}, {
		underscored: true,
        timestamps: false,
		freezeTableName: true,
		tableName: 'basicData',
	  })
	return basicData;
}