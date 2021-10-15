'use strict';

const Service = require('egg').Service;
const fs=require('fs')
const path=require('path')
class Auxiliary extends Service {
  constructor(ctx) {
    super(ctx);
    //this.BasicData = ctx.model.BasicData;
    this.Event=ctx.model.Event;
    this.IndicatorEvent=ctx.model.IndicatorEvent;
    this.ApplicationIndicator=ctx.model.ApplicationIndicator
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
  async downData(id){
    const { ctx, app } = this;
		const Op = app.Sequelize.Op;
    //应用详情
    const appInfo = await this.Application.findOne({
      where: {
          application_id: id
      }
    })
    //console.log(appInfo.dataValues.note,'appInfo');
    let flag = appInfo.dataValues.is_interactive == 1 ? true : false;
    var obj = `
    // 埋点操作手册-务必先通读一遍操作手册
    http://fed.enbrands.com/buried-docs/sdkDocs/
    //初始化代码
    {
        is_prod: false,      // 数据埋入测试环境还是正式环境
        runtime_env:'',      //  参见埋点api
        merchant_id:'未知',   //  店铺ID 也就是店铺号 无法获取就写未知
        distinct_id:'未知',   //  用户ID
        act_id:'未知',        //  活动ID 也就是活动号
        member_id:'未知',     //  会员ID
        platform_app: "${appInfo.dataValues.platform_app}", 
        platform_app_code: "${appInfo.dataValues.platform_app_code}",
        platform_app_version:"${appInfo.dataValues.platform_app_version}",
        application_dep_platform:"${appInfo.dataValues.application_dep_platform}",
        platform_business:"${appInfo.dataValues.platform_business}",
        application_label:"${appInfo.dataValues.application_label}",
        is_interactive:${flag}
        nick:'未知',
        mix_nick:'未知',
        act_name:'未知',
        open_id:'未知',
        phone:'未知',
        ouid:'未知',
        provider:'未知',
        open_type:1,          //  1正常数据也就是对接新埋点平台，2互动营销类的，3其他
    }
    //需要埋入的事件代码
    `;
    //获取指标
    var arr=[]
    arr = await this.ApplicationIndicator.findAll({
      where: {application_id: id},
      attributes: ['indicator_id']
    })
    if(arr.length>0){
      var indicatorIds = []
      for (var i = 0; i < arr.length; i++) {
        indicatorIds.push({indicator_id:arr[i].indicator_id});
      }
      var objOption = {
        [Op.or]: indicatorIds,
      }
      var arr1 = await this.IndicatorEvent.findAll({ //事件去重（不去重也行）后按IDS获取详情
        where: objOption,
        attributes: ['event_id']
      })
      if(arr1.length>0){
        var eventIds = [];
        for (var i = 0; i < arr1.length; i++) {
          eventIds.push({ event_id:arr1[i].event_id});
        }
        var objOption = {
          [Op.or]: eventIds,
        }
        var Eventarr = await this.Event.findAll({
          where: objOption,
        })
        console.log(Eventarr[0].dataValues.event_name);
        var str=''
        for(let z=0;z<Eventarr.length;z++){
  var obj1=
          `//事件${z+1}
          {
            event_name: "${Eventarr[z].dataValues.event_name}",
            event_code: "${Eventarr[z].dataValues.event_code}",
            event_label: "${Eventarr[z].dataValues.event_label}",
            event_trigger_mode: "${Eventarr[z].dataValues.event_trigger_mode}",
            url: ""             //写页面的路径
          }
          `;
          str+=obj1
        }
        var theData=obj+str
        //取事件的方法
      }
    }    
    const filePath=path.resolve(this.app.config.static.dir, 'point.docx');
    var buffer=Buffer.from(theData)
    fs.writeFileSync(filePath,theData,{encoding: 'utf8'})
    this.ctx.attachment(filePath);
    this.ctx.set('Content-Type',"application/octet-stream");
    //var a=fs.createReadStream(filePath)
    this.ctx.body=fs.createReadStream(filePath)
   var temp=null;
    var option={
      method:'POST',
      //data:temp,
      files:filePath,
      headers:{//自定义header
          "Accept": "*/*",
          "Content-Type":"application/json"
      },
      //rejectUnauthorized: false,
      dataType:'json'
  }
  var res = await this.ctx.curl('https://test-s3.zkyai.com/jzone_enbrands/bend/file-upload',option);
  return this.ServerResponse.requireData('查询成功', res.data.data);
  }
}
module.exports = Auxiliary;
