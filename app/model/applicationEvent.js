module.exports = app => {
    const { INTEGER } = app.Sequelize;
    const applicationEvent = app.model.define('applicationEvent', {
        application_id: {
            type: INTEGER,
            primaryKey: true
        },
        event_id: {
            type: INTEGER,
            primaryKey: true
        },
        open_type:{defaultValue:1,type:INTEGER(2),comment:'数据来源'}, 
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'applicationEvent',
	});
    return applicationEvent;
}