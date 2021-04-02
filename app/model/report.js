// app/model/report.js
  module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Report = app.model.define('report', {
      report_id: { 
        type: INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      title: STRING(64),
      tag_conf: STRING,
      description: STRING,
      status: INTEGER,
      created_at: {
        type: DATE,
        defaultValue: Date.now()
      },
      updated_at: {
        type: DATE,
        defaultValue: Date.now()
      }
    });
  
    return Report;
  };
  