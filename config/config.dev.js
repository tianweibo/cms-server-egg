'use strict';

exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  database: 'buried_points_server',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'woainia123',
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