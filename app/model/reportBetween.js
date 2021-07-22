module.exports = app => {
    const { INTEGER,STRING } = app.Sequelize;
    const reportBetween = app.model.define('reportBetween', {
        report_id: {
            type: INTEGER,
            primaryKey: true
        },
        card_ids: {
            type: STRING
        },
        table_ids: {
            type: STRING
        },
        trend_ids: {
            type: STRING
        }
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'reportBetween',
	});
    return reportBetween;
}