'use strict';

// app/controller/activity.js
const Controller = require('egg').Controller;

class ActivityController extends Controller {

  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const list = await ctx.service.activity.list(page);
    const total = await ctx.service.activity.count();

    await ctx.render('article/list.tpl', { list, total });
  }

  async createView() {
    const ctx = this.ctx;
    await ctx.render('article/create.tpl');
  }

  async create() {
    const ctx = this.ctx;
    const body = this.ctx.request.body;

    const row = {
      title: body.title,
      description: body.description,
    };
    const res = await ctx.service.activity.create(row)
    await ctx.redirect('/article/list.tpl');
  }

  async detail() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const articleInfo = await ctx.service.activity.find(id);

    await ctx.render('article/detail.tpl', { item: articleInfo });
  }

  async edit() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const articleInfo = await ctx.service.activity.find(id);

    await ctx.render('article/edit.tpl', { item: articleInfo });
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const body = this.ctx.request.body;

    const row = {
      title: body.title,
      description: body.description,
    };

    const res = await ctx.service.activity.update(row, {
      id: id
    });

    ctx.redirect('/article/list');
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await ctx.service.activity.delete(id);

    ctx.redirect('/article/list');
  }

}

module.exports = ActivityController;
