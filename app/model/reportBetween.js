module.exports = app => {
    const { INTEGER } = app.Sequelize;
    const reportBetween = app.model.define('reportBetween', {
        report_id: {
            type: INTEGER,
            primaryKey: true
        },
        card_id: {
            type: INTEGER
        },
        table_id: {
            type: INTEGER
        },
        trend_id: {
            type: INTEGER
        }
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'reportBetween',
	});
    return reportBetween;
}