const Service = require('egg').Service

class ChartService extends Service {
  async add(params) {
    this.ctx.logger.info(params)
  }

  async query(params) {
    this.ctx.logger.info(`chart service query`)
    const res = await this.ctx.curl('https://huidu.enbrands.com/v1/fed', {
        method: 'GET',
        rejectUnauthorized: false,
        dataType: 'json'
    })
    this.ctx.logger.info(res)
  }
}

module.exports = ChartService