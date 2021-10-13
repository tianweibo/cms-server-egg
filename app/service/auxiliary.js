'use strict';

const Service = require('egg').Service;
class Auxiliary extends Service {
  constructor(ctx) {
    super(ctx);
    //this.BasicData = ctx.model.BasicData;
    this.Event=ctx.model.Event;
    this.Indicator = ctx.model.Indicator;
    this.Application = ctx.model.Application;
    this.TheUser=ctx.model.User;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }
  async repairData(data) {
    try {
     switch (data.type) {
        case 1:
            row = await this.Event.update({
                create_people: data.create_people,
                role:data.role
            }, { where: { event_id: data.data_id }, individualHooks: true });
        break;
        case 2:
            row = await this.Indicator.update({
                create_people: data.create_people,
                role:data.role
            }, { where: { indicator_id: data.data_id }, individualHooks: true });
          break;
        case 3:
            row = await this.Application.update({
                create_people: data.create_people,
                role:data.role
            }, { where: { application_id: data.data_id }, individualHooks: true });
          break;
        case 4:
            row = await this.TheUser.update({
                create_people: data.create_people,
                role:data.role
            }, { where: { id: data.data_id }, individualHooks: true });
          break;
        default:
          break;
      }
      if (row) {
        return this.ServerResponse.createBySuccessMsg('数据修改成功');
      } else {
        return this.ServerResponse.requireData(`数据修改失败`, { code: 1 });
      }
    } catch (e) {
        return this.ServerResponse.networkError('网络问题');
    }
  }
}
module.exports = Auxiliary;
