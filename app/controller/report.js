'use strict';

// app/controller/report.js
const Controller = require('egg').Controller;

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

// app/controller/report.js
class ReportController extends Controller {

  async index() {
    const ctx = this.ctx;    
    
    const page = ctx.query.page || 1;
    const page_size = 10;

    // console.log('==ctx.model.Activity==', ctx.model.Activity);

    const ReportHasOneActivity = ctx.model.Report.hasOne(ctx.model.Activity, { 
      // 最外部的作用域就定义一下这个映射关系，这样运行周期里只会执行一次
      foreignKey: 'activity_id',
      sourceKey: 'activity_id',
      // as: 'activityInfo',
      distinct: true
    });

    // console.log('==ReportHasOneActivity==', ReportHasOneActivity);
   
    let options = {
      order:[["report_id","desc"]],
      limit: page_size, // 返回数据量
      offset: (page - 1) * page_size, // 数据偏移量
      where: {},
      include: [{
        association: ReportHasOneActivity // 这里再传入他，这个对象只是类似一个工厂函数，实际查询的时候findAll会找到最新的结果
      }],
      distinct: true
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

  async list() {
  
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

    const {
      activity_id,
      title,
      tag_conf,
      description,
    } = ctx.request.body;

    const data = {
      activity_id,
      title,
      description,
      tag_conf: JSON.stringify(tag_conf)
    };

    const res = await ctx.model.Report.create(data);
    ctx.body = ctx.helper.apiResponse(200, 'success');
  }

  async update() {
    const ctx = this.ctx;

    const {
      report_id,
      activity_id,
      title,
      tag_conf,
      description,
    } = ctx.request.body;

    const data = {
      activity_id,
      title,
      description,
      tag_conf: JSON.stringify(tag_conf)
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
