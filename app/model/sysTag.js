// app/model/sysTag.js
  module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const SysTag = app.model.define('sys_tag', {
      tag_id: { 
        type: INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      tag_name: STRING(64),
      tag_key: STRING(64),
      description: STRING,
      status: INTEGER,
      // created_at: STRING(64),
      // updated_at: STRING(64),
    });
  
    return SysTag;
  };
  