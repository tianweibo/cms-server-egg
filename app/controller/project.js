'use strict';

// app/controller/project.js
const Controller = require('egg').Controller;

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

// app/controller/project.js
class ProjectController extends Controller {
  
  async index() {

    const page = this.ctx.query.page || 1;
    const page_size = 2;

    const keywords = '雅';

    let options = {
      order:[["project_id","desc"]],
      limit: page_size, // 返回数据量
      offset: (page - 1) * page_size, // 数据偏移量
      where: { 
        // title: { 
        //   [Op.like]:'%' +keywords + '%'
        // }
      }
    };

    const { filters } = this.ctx.query;

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

    const res = await this.ctx.model.Project.findAndCountAll(options);
    const { rows, count } = res;

    this.ctx.body = {
      options: options,
      list: rows,
      total: count,
    };
  }

  async list() {

    const page = this.ctx.query.page || 1;
    const page_size = 2;

    let options = {
      order:[["project_id","desc"]],
      limit: page_size, // 返回数据量
      offset: (page - 1) * page_size, // 数据偏移量
      where: {}
    };

    let { filters } = this.ctx.query;

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

    const res = await this.ctx.model.Project.findAndCountAll(options);
    const { rows, count } = res;

    this.ctx.body = this.ctx.helper.apiResponse(200, 'success', { 
      page,
      page_size,
      total: count,
      list: rows,
    });

  }

}

module.exports = ProjectController;
