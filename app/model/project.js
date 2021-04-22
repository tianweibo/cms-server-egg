// app/model/project.js
  module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Project = app.model.define('project', {
      project_id: { 
        type: INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      title: STRING(64),
      tag_conf: STRING,
      description: STRING,
      start_date: STRING(32),
      end_date: STRING(32),
      status: INTEGER,
      // created_at: {
      //   type: DATE,
      //   defaultValue: Date.now()
      // },
      // updated_at: {
      //   type: DATE,
      //   defaultValue: Date.now()
      // }
    });
  
    return Project;
  };
  