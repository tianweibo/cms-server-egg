'use strict';

// app/controller/activity.js
const Controller = require('egg').Controller;

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

// app/controller/activity.js
class ActivityController extends Controller {
  
  async index() {
    const ctx = this.ctx;    
    
    const page = ctx.query.page || 1;
    const page_size = 10;

    let options = {
      order:[["activity_id","desc"]],
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
        case 'activity_id':
          options.where[field] = filters[field];
          break;
      }
    })

    const activitys = await ctx.model.Activity.findAndCountAll(options);
    const { rows, count } = activitys;

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
      attributes:['activity_id','title','tag_conf','created_at'],
      order:[["activity_id","desc"]],
      where: {}
    };

    const activities = await ctx.model.Activity.findAll(options);

    activities.forEach((item)=>{
      item.tag_conf = JSON.parse(item.tag_conf);
    })

    ctx.body = ctx.helper.apiResponse(200, 'success', { 
      list: activities,
    });
  }

  async detail() {
    const ctx = this.ctx;    
    const activity_id = ctx.query.activity_id;

    let activity = await ctx.model.Activity.findByPk(activity_id);
    console.log('activity')
    console.log(activity)
        activity.tag_conf = JSON.parse(activity.tag_conf);
        
    ctx.body = ctx.helper.apiResponse(200, 'success', activity);
  }

  async create() {
    const ctx = this.ctx;

    const {
      project_id,
      title,
      start_date,
      end_date,
      tag_conf,
      description,
    } = ctx.request.body;

    const data = {
      project_id,
      title,
      start_date,
      end_date,
      tag_conf,
      description,
      tag_conf: JSON.stringify(tag_conf)
    };

    const res = await ctx.model.Activity.create(data);
    ctx.body = ctx.helper.apiResponse(200, 'success');
  }

  async update() {
    const ctx = this.ctx;
    
    const {
      activity_id,
      project_id,
      title,
      start_date,
      end_date,
      tag_conf,
      description,
    } = ctx.request.body;

    const data = {
      project_id,
      title,
      start_date,
      end_date,
      tag_conf,
      description,
      tag_conf: JSON.stringify(tag_conf)
    };

    const activity = await ctx.model.Activity.findByPk(activity_id);
    await activity.update(data);
    ctx.body = ctx.helper.apiResponse(200, 'success', data);
  }

  async delete() {
    const ctx = this.ctx;
    const activity_id = ctx.query.activity_id;
    const activity = await ctx.model.Activity.findByPk(activity_id);
    await activity.destroy();
    ctx.body = ctx.helper.apiResponse(200, 'success');
  }

}

module.exports = ActivityController;
