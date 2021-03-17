'use strict';

// app/controller/activity.js
const Controller = require('egg').Controller;

class ChartController extends Controller {
  async chart() {
    await this.ctx.render('chart/chart.tpl')
  }

  async add() {
    const ctx = this.ctx;
    const body = this.ctx.request.body;
    const row = body;
    const res = await ctx.service.chart.add(row)
    await ctx.redirect('/chart/chart');
  }

  async query() {
    this.ctx.logger.info(`chart controller query`)
    const ctx = this.ctx;
    const body = this.ctx.request.body;
    const row = body;
    const res = await ctx.service.chart.query(row)
  }
}

module.exports = ChartController