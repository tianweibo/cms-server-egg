'use strict';
const Service = require('egg').Service;

class ActivityService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.api;

    // this.ctx.headers['Content-Type'] = 'application/jsoncharset=UTF-8';
    const { data: { data } } = await this.ctx.curl(`${serverUrl}/api/activity-info/lists`, {
      data: {
        page,
        pageSize,
      },
      dataType: 'json',
    });

    return data;
  }

  async detail(id) {
    // read config
    const { serverUrl } = this.config.api;
    // this.ctx.headers['Content-Type'] = 'application/jsoncharset=UTF-8';
    const { data } = await this.ctx.curl(`${serverUrl}/api/activity-info/detail`, {
      data: {
        activity_id: id,
      },
      dataType: 'json',
    });

    return data;
  }

}

module.exports = ActivityService;
