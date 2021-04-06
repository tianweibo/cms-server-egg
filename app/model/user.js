// app/model/sysTag.js
  module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const User = app.model.define('sys_user', {
      user_id: { 
        type: INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      mobile: STRING(64),
      password: STRING(64),
      role_id: INTEGER,
      status: INTEGER,
      description: STRING,
      token: STRING(32),
      created_at: STRING(64),
      updated_at: STRING(64),
    });

    return User;
  };
  