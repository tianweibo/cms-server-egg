'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {

  async list() {

    const page = 1;
    const page_size = 10;
    const total = 20;
    const list = [{
      id: 1,
      title: 'news title',
      created_at: '2021-03-22',
    }];

    const data = { 
      page,
      page_size,
      total,
      list,
    };

    this.ctx.body = this.ctx.helper.apiResponse(200, 'success', data);
  }

}

module.exports = NewsController;
