'use strict';

// app/controller/report.js
const Controller = require('egg').Controller;

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

// app/controller/report.js
class ReportController extends Controller {

  async list() {
    const ctx = this.ctx;    
    
    const page = ctx.query.page || 1;
    const page_size = 10;

    let options = {
      order:[["report_id","desc"]],
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
        case 'report_id':
          options.where[field] = filters[field];
          break;
      }
    })

    const reports = await ctx.model.Report.findAndCountAll(options);
    const { rows, count } = reports;

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

  async detail() {
    const ctx = this.ctx;    
    const report_id = ctx.query.report_id;

    let report = await ctx.model.Report.findByPk(report_id);
        report.tag_conf = JSON.parse(report.tag_conf);
        
    ctx.body = ctx.helper.apiResponse(200, 'success', report);
  }

  async create() {
    const ctx = this.ctx;
    const body = ctx.request.body;

    const data = {
      ...body, 
      tag_conf: JSON.stringify(body.tag_conf)
    };

    const res = await ctx.model.Report.create(data);
    ctx.body = ctx.helper.apiResponse(200, 'success');
  }

  async update() {
    const ctx = this.ctx;
    const report_id = ctx.query.report_id;
    const body = ctx.request.body;
    
    const data = {
      ...body, 
      tag_conf: JSON.stringify(body.tag_conf)
    };

    const report = await ctx.model.Report.findByPk(report_id);
    await report.update(data);
    ctx.body = ctx.helper.apiResponse(200, 'success', data);
  }

  async delete() {
    const ctx = this.ctx;
    const report_id = ctx.query.report_id;
    const report = await ctx.model.Report.findByPk(report_id);
    await report.destroy();
    ctx.body = ctx.helper.apiResponse(200, 'success');
  }

}

module.exports = ReportController;
