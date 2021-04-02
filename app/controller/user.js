  'use strict';

  // app/controller/user.js
  const Controller = require('egg').Controller;
  
  const Sequelize = require('sequelize');
  
  const Op = Sequelize.Op;
  
  // app/controller/user.js
  class UserController extends Controller {
    
    async login() {
      const ctx = this.ctx;    
      const { token } = ctx.query;
  
      let user = await ctx.model.User.findOne({token});
      if (!user){
        ctx.body = ctx.helper.apiResponse(404, 'fail');
      }

      const data = {
        token: 'token',
      };
      await user.update(data);
      ctx.body = ctx.helper.apiResponse(200, 'success', data);
    }

    async loginOut() {
      const ctx = this.ctx;    
      const { token } = ctx.query;
  
      let user = await ctx.model.User.findOne({token});
      if (user){
        const data = {
          token: '',
        };
        await user.update(data);
      }

      ctx.body = ctx.helper.apiResponse(200, 'success', data);
    }

    async index() {
      const ctx = this.ctx;    
      
      const page = ctx.query.page || 1;
      const page_size = 10;
  
      let options = {
        order:[["user_id","desc"]],
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
          case 'mobile':
            options.where[field] = { 
              [Op.like]:'%' +filters[field] + '%'
            };
            break;
          case 'user_id':
            options.where[field] = filters[field];
            break;
        }
      })
  
      const users = await ctx.model.User.findAndCountAll(options);
      const { rows, count } = users;
  
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
        attributes:['user_key','user_name', 'description'],
        order:[["user_id","desc"]],
        where: {}
      };

      const user = await ctx.model.User.findAll(options);

      ctx.body = ctx.helper.apiResponse(200, 'success', { 
        list: user,
      });
    }
  
    async detail() {
      const ctx = this.ctx;    
      const user_id = ctx.query.user_id;
  
      let user = await ctx.model.User.findByPk(user_id);
      ctx.body = ctx.helper.apiResponse(200, 'success', user);
    }
  
    async create() {
      const ctx = this.ctx;
      const body = ctx.request.body;
  
      const data = {
        ...body, 
      };
  
      const res = await ctx.model.User.create(data);
      ctx.body = ctx.helper.apiResponse(200, 'success');
    }
  
    async update() {
      const ctx = this.ctx;
      const user_id = ctx.query.user_id;
      const body = ctx.request.body;
      
      const data = {
        ...body, 
      };
  
      const user = await ctx.model.User.findByPk(user_id);
      await user.update(data);
      ctx.body = ctx.helper.apiResponse(200, 'success', data);
    }
  
    async delete() {
      const ctx = this.ctx;
      const user_id = ctx.query.user_id;
      const user = await ctx.model.User.findByPk(user_id);
      await user.destroy();
      ctx.body = ctx.helper.apiResponse(200, 'success');
    }
  
  }
  
  module.exports = UserController;
  