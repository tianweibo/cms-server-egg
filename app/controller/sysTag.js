  'use strict';

  // app/controller/tag.js
  const Controller = require('egg').Controller;
  
  const Sequelize = require('sequelize');
  
  const Op = Sequelize.Op;
  
  // app/controller/tag.js
  class SysTagController extends Controller {
    
    async index() {
      const ctx = this.ctx;    
      
      const page = ctx.query.page || 1;
      const page_size = 10;
  
      let options = {
        order:[["tag_id","desc"]],
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
          case 'tag_name':
            options.where[field] = { 
              [Op.like]:'%' +filters[field] + '%'
            };
            break;
          case 'tag_id':
            options.where[field] = filters[field];
            break;
        }
      })
  
      const tags = await ctx.model.SysTag.findAndCountAll(options);
      const { rows, count } = tags;
  
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
        attributes:['tag_id','tag_key','tag_name', 'description'],
        order:[["tag_id","desc"]],
        where: {}
      };

      const sysTags = await ctx.model.SysTag.findAll(options);

      ctx.body = ctx.helper.apiResponse(200, 'success', { 
        list: sysTags,
      });
    }
  
    async detail() {
      const ctx = this.ctx;    
      const tag_id = ctx.query.tag_id;
  
      let tag = await ctx.model.SysTag.findByPk(tag_id);
      ctx.body = ctx.helper.apiResponse(200, 'success', tag);
    }
  
    async create() {
      const ctx = this.ctx;
      const body = ctx.request.body;
  
      const data = {
        ...body, 
        tag_conf: JSON.stringify(body.tag_conf)
      };
  
      const res = await ctx.model.SysTag.create(data);
      ctx.body = ctx.helper.apiResponse(200, 'success');
    }
  
    async update() {
      const ctx = this.ctx;

      const {
        tag_id,
        tag_name,
        tag_key,
        description,
      } = ctx.request.body;
      
      const data = {
        tag_name,
        tag_key,
        description,
      };
  
      const tag = await ctx.model.SysTag.findByPk(tag_id);
      await tag.update(data);
      ctx.body = ctx.helper.apiResponse(200, 'success', data);
    }
  
    async delete() {
      const ctx = this.ctx;
      const tag_id = ctx.query.tag_id;
      const tag = await ctx.model.SysTag.findByPk(tag_id);
      await tag.destroy();
      ctx.body = ctx.helper.apiResponse(200, 'success');
    }
  
  }
  
  module.exports = SysTagController;
  