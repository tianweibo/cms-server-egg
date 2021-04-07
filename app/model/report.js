// app/model/report.js
  module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Report = app.model.define('report', {
      report_id: { 
        type: INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      activity_id: INTEGER,
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

    Report.associate = function (){
      // 与Activity存在一对多关系，所以是hasOne()
      app.model.Report.hasOne(app.model.Activity, {
        foreignKey: 'activity_id', 
        sourceKey:'activity_id'
      });
    }
  
    return Report;
  };
  