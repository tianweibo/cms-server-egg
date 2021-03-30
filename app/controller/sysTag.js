'use strict';

// app/controller/sysTag.js
const Controller = require('egg').Controller;

class SysTagController extends Controller {

  async tagList() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const page_size = 100;

    let options = {
      columns: ['tag_name', 'tag_key', 'description'], // 要查询的表字段
      limit: page_size, // 返回数据量
      offset: (page - 1) * page_size, // 数据偏移量  
    };
    const list = await ctx.service.sysTag.list(options);

    ctx.body = ctx.helper.apiResponse(200, 'success', { list });
  }

  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const page_size = 2;

    let options = {
      limit: page_size, // 返回数据量
      offset: (page - 1) * page_size, // 数据偏移量  
    };
    const list = await ctx.service.sysTag.list(options);
    const total = await ctx.service.sysTag.count();

    ctx.body = ctx.helper.apiResponse(200, 'success', { page, page_size, total, list });
  }

  async create() {
    const ctx = this.ctx;
    const body = this.ctx.request.body;

    const data = {
      title: body.title,
      description: body.description,
    };
    const res = await ctx.service.sysTag.create(data);

    ctx.body = ctx.helper.apiResponse(200, 'sucess');
  }

  async detail() {
    const ctx = this.ctx;
    const sysTag_id = ctx.query.sysTag_id;
    console.log('===ctx.query===', ctx.query);
    const articleInfo = await ctx.service.sysTag.findOne({
      sysTag_id: sysTag_id,
    });

    ctx.body = ctx.helper.apiResponse(200, 'sucess', articleInfo);
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const body = this.ctx.request.body;

    const data = {
      title: body.title,
      description: body.description,
    };

    const res = await ctx.service.sysTag.update(data, {
      id: id
    });

    ctx.body = ctx.helper.apiResponse(200, 'sucess');
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await ctx.service.sysTag.delete(id);

    ctx.body = ctx.helper.apiResponse(200, 'sucess');
  }

}

module.exports = SysTagController;
