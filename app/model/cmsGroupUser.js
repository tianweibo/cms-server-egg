module.exports = app => {
    const { INTEGER } = app.Sequelize;
    const cmsGroupUser = app.model.define('cmsGroupUser', {
        id:{
			type:INTEGER,
			primaryKey:true,
			autoIncrement:true,
		},
        user_id: {
            type: INTEGER
        },
        group_id: {
            type: INTEGER
        }
    },{
        timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'cmsGroupUser',
	});
    return cmsGroupUser;
}