'use strict';

// app/controller/project.js
const Controller = require('egg').Controller;

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

// app/controller/project.js
class ProjectController extends Controller {

  async index() {
    const ctx = this.ctx;    
    
    const page = ctx.query.page || 1;
    const page_size = 10;

    let options = {
      order:[["project_id","desc"]],
      limit: page_size, // 返回数据量
      offset: (page - 1) * page_size, // 数据偏移量
      where: {}
    };

    let { filters } = ctx.query;

    if (filters){
      filters = JSON.parse(filters);
    }

    //处理查询
    filters && Object.keys(filters).forEach(field => {
      switch(field){
        case 'title':
          options.where[field] = { 
            [Op.like]:'%' +filters[field] + '%'
          };
          break;
        case 'project_id':
          options.where[field] = filters[field];
          break;
      }
    })

    const projects = await ctx.model.Project.findAndCountAll(options);
    const { rows, count } = projects;

    rows.forEach((item)=>{
      item.tag_conf = JSON.parse(item.tag_conf);
    })

    ctx.body = ctx.helper.apiResponse(200, 'success', { 
      page,
      page_size,
      total: count,
      list: rows,
    });
  }

  async list() {
    const ctx = this.ctx;    
    
    let options = {
      attributes:['project_id','title'],
      order:[["project_id","desc"]],
      where: {}
    };

    const project = await ctx.model.Project.findAll(options);

    ctx.body = ctx.helper.apiResponse(200, 'success', { 
      list: project,
    });
  }

  async detail() {
    const ctx = this.ctx;    
    const project_id = ctx.query.project_id;

    let project = await ctx.model.Project.findByPk(project_id);
        project.tag_conf = JSON.parse(project.tag_conf);
        
    ctx.body = ctx.helper.apiResponse(200, 'success', project);
  }

  async create() {
    const ctx = this.ctx;
    const body = ctx.request.body;

    const data = {
      ...body, 
      tag_conf: JSON.stringify(body.tag_conf)
    };

    const res = await ctx.model.Project.create(data);
    ctx.body = ctx.helper.apiResponse(200, 'success');
  }

  async update() {
    const ctx = this.ctx;
    const project_id = ctx.query.project_id;
    const body = ctx.request.body;
    
    const data = {
      ...body, 
      tag_conf: JSON.stringify(body.tag_conf)
    };

    const project = await ctx.model.Project.findByPk(project_id);
    await project.update(data);
    ctx.body = ctx.helper.apiResponse(200, 'success', data);
  }

  async delete() {
    const ctx = this.ctx;
    const project_id = ctx.query.project_id;
    const project = await ctx.model.Project.findByPk(project_id);
    await project.destroy();
    ctx.body = ctx.helper.apiResponse(200, 'success');
  }

}

module.exports = ProjectController;
