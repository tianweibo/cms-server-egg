'use strict';

exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  database: 'buried_points_server',
  host: '116.198.161.239',
  timezone: '+08:00', // 保存为本地时区
  port: 30001,
  username: 'prod',
  password: 'prodENbsaRq1523y1b1',
  delegate: 'model',
  baseDir: 'model',
  define: {
    // raw: true,
    underscored: true,
    freezeTableName: true, //直接查找设置的表名，默认是表名加s或者es
    timestamps: false,
    createdAt: "CreatedAt",  //自定义时间戳
    updatedAt: "UpdatedAt", // 自定义时间戳
    timezone: '+08:00' // 保存为本地时区
  }
};