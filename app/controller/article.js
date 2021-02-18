'use strict';

// app/controller/article.js
const Controller = require('egg').Controller;

class ArticleController extends Controller {

  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const res = await ctx.service.article.list(page);

    await ctx.render('article/list.tpl', { ...res });
  }

  async create() {
    const ctx = this.ctx;
    await ctx.render('article/edit.tpl');
  }

  async read() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const articleInfo = await ctx.service.article.read(id);

    await ctx.render('article/detail.tpl', { item: articleInfo });
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const articleInfo = await ctx.service.article.read(id);

    await ctx.render('article/edit.tpl', { item: articleInfo });
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await ctx.service.article.delete(id);
    if (res) {
      console.log('success');
    } else {
      console.log('fail');
    }

  }

}

module.exports = ArticleController;
