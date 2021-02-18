'use strict';

// app/controller/activity.js
const Controller = require('egg').Controller;

class ActivityController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const res = await ctx.service.activity.list(page);

    await ctx.render('activity/list.tpl', { ...res });
  }

  async detail() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const activityInfo = await ctx.service.activity.detail(id);

    await ctx.render('activity/detail.tpl', { item: activityInfo });
  }

}

module.exports = ActivityController;
