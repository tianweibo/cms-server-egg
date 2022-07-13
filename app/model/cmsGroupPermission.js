module.exports = app => {
    const { INTEGER } = app.Sequelize;
    const cmsGroupPermission = app.model.define('cmsGroupPermission', {
        id:{
			type:INTEGER,
			primaryKey:true,
			autoIncrement:true,
		},
        group_id: {
            type: INTEGER
        },
        permission_id: {
            type: INTEGER
        }
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'cmsGroupPermission',
	});
    return cmsGroupPermission;
}