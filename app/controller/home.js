'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await this.ctx.render('home/home.tpl')
  }
}

module.exports = HomeController;
