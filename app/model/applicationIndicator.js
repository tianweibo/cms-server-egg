module.exports = app => {
    const { INTEGER } = app.Sequelize;
    const applicationIndicator = app.model.define('applicationIndicator', {
        application_id: {
            type: INTEGER,
            primaryKey: true
        },
        indicator_id: {
            type: INTEGER,
            primaryKey: true
        }
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'applicationIndicator',
	});
    return applicationIndicator;
}