'use strict';

// app/controller/report.js
const Controller = require('egg').Controller;

class ReportController extends Controller {

  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const page_size = 2;

    let options = {
      limit: page_size, // 返回数据量
      offset: (page - 1) * page_size, // 数据偏移量  
    };
    const list = await ctx.service.report.list(options);
    const total = await ctx.service.report.count();

    ctx.body = ctx.helper.apiResponse(200, 'success', { page, page_size, total, list });
  }

  async create() {
    const ctx = this.ctx;
    const body = this.ctx.request.body;

    const data = {
      title: body.title,
      description: body.description,
    };
    const res = await ctx.service.report.create(data);

    ctx.body = ctx.helper.apiResponse(200, 'sucess');
  }

  async detail() {
    const ctx = this.ctx;
    const report_id = ctx.query.report_id;
    console.log('===ctx.query===', ctx.query);
    const articleInfo = await ctx.service.report.findOne({
      report_id: report_id,
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

    const res = await ctx.service.report.update(data, {
      id: id
    });

    ctx.body = ctx.helper.apiResponse(200, 'sucess');
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await ctx.service.report.delete(id);

    ctx.body = ctx.helper.apiResponse(200, 'sucess');
  }

}

module.exports = ReportController;
