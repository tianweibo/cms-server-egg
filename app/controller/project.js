'use strict';

// app/controller/project.js
const Controller = require('egg').Controller;

class ProjectController extends Controller {

  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const page_size = 10;

    let options = {
      limit: page_size, // 返回数据量
      offset: (page - 1) * page_size, // 数据偏移量  
    };
    const list = await ctx.service.project.list(options);
    const total = await ctx.service.project.count();

    ctx.body = ctx.helper.apiResponse(200, 'success', { 
      page,
      page_size,
      total,
      list,
    });
  }

  async create() {
    const ctx = this.ctx;
    const body = this.ctx.request.body;

    const data = {
      ...body, 
      tag_conf: JSON.stringify(body.tag_conf)
    };
    const res = await ctx.service.project.create(data);

    ctx.body = ctx.helper.apiResponse(200, 'sucess');
  }

  async detail() {
    const ctx = this.ctx;
    const project_id = ctx.query.project_id;
    console.log('===ctx.query===', ctx.query);
    const articleInfo = await ctx.service.project.findOne({
      project_id: project_id,
    });

    ctx.body = ctx.helper.apiResponse(200, 'sucess', {
      ...articleInfo,
      tag_conf: JSON.parse(articleInfo.tag_conf),
    });
  }

  async update() {
    const ctx = this.ctx;
    const { project_id } = ctx.query;
    const { title, tag_conf, start_date, end_date, description } = this.ctx.request.body;
console.log('===tag_conf===', tag_conf);
    const data = {
      title, 
      start_date, 
      end_date, 
      description,
      tag_conf:JSON.stringify(tag_conf), 
    };

    const res = await ctx.service.project.update(data, { project_id });

    ctx.body = ctx.helper.apiResponse(200, 'sucess');
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await ctx.service.project.delete(id);

    ctx.body = ctx.helper.apiResponse(200, 'sucess');
  }

}

module.exports = ProjectController;
