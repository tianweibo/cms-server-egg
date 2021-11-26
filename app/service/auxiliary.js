'use strict';

const Service = require('egg').Service;
const fs=require('fs')
const path=require('path')
const sd = require('silly-datetime');
class Auxiliary extends Service {
  constructor(ctx) {
    super(ctx);
    //this.BasicData = ctx.model.BasicData;
    this.Event=ctx.model.Event;
    this.IndicatorEvent=ctx.model.IndicatorEvent;
    this.ApplicationIndicator=ctx.model.ApplicationIndicator;
    this.ApplicationEvent=ctx.model.ApplicationEvent;
    this.Indicator = ctx.model.Indicator;
    this.Application = ctx.model.Application;
    this.TheUser=ctx.model.User;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.ReportBetween=ctx.model.ReportBetween;
    this.Card=ctx.model.Card;
    this.Trend=ctx.model.Trend;
    this.Table=ctx.model.Table;
    this.ApplicationEvent=ctx.model.ApplicationEvent;
  }
  async giveDataForAppEvent(id){
    const { ctx, app } = this;
		const Op = app.Sequelize.Op;
    //this.ApplicationIndicator=>应用下对应的指标
    const arrIndins = await this.ApplicationIndicator.findAll({
      where: {application_id: id},
      attributes: ['indicator_id']
    })
    if(arrIndins && arrIndins.length>0){
      var IndicIds = []
      for (var i = 0; i < arrIndins.length; i++) {
        IndicIds.push({indicator_id:arrIndins[i].indicator_id});
      }
      var objOption = {
        [Op.or]: IndicIds,
      }
      var Eventarr = await this.IndicatorEvent.findAll({
        where: objOption,
        attributes: ['event_id']
      })
      if(Eventarr && Eventarr.length>0){
        var eventIds = []
        for (var i = 0; i < Eventarr.length; i++) {
          eventIds.push({event_id:Eventarr[i].event_id});
        }
        var objOption1 = {
          [Op.or]: eventIds,
        }
        var Eventarr = await this.Event.findAll({
            where: objOption1,
            attributes: ['event_id','open_type']
        })
        if(Eventarr && Eventarr.length>0){
          //更新 this.ApplicationEvent
          var updateData = []
          for (var i = 0; i < Eventarr.length; i++) {
            updateData.push(
              {event_id:Eventarr[i].event_id,
                application_id:id,
                open_type:Eventarr[i].open_type
            });
          }
          console.log(updateData,'xxx')
          const updateDate1=await this.ApplicationEvent.bulkCreate(updateData,{ updateOnDuplicate:['application_id','event_id','open_type']})
        }else{
          //无事件
        }
      }else{
        //指标未关联事件
      }
    }else{
      //无指标
    }
    
    
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
  async repairReportIndic(id){
    //使用报表ID 查找ReportBetween表查找出 三种格式对应的指标IDS，
    const indicObj=await this.ReportBetween.findOne({
      where:{
        report_id:id
      },
      attributes: ['card_ids','table_ids','trend_ids']
    })
    //分别循环 card_ids table_ids  trend_ids 三个数组，=》找出events 字段
    //通过events字段，通过 Event表查找出 event_name,event_id，
    if(indicObj.dataValues.card_ids){
      var cardArr=indicObj.dataValues.card_ids.split(',');
      var tempCard=[]
      for(let i=0;i<cardArr.length;i++){
        var obj={
          card_id:cardArr[i],
          event_ids:'',
          event_names:'',
          event_relation:1
        }
        const Events=await this.Card.findOne({
          where:{
            card_id:cardArr[i]
          },
          attributes:['events']
        })
        if(Events && Events.dataValues.events){
          const eventCodes=Events.dataValues.events.split(',');
          if(eventCodes.length>1){
            obj.event_relation=2
          }
          for(let j=0;j<eventCodes.length;j++){ 
            const EventData=await this.Event.findOne({
              where:{
                event_code:eventCodes[j]
              },
              attributes:['event_id','event_name']
            })
            if(j==eventCodes.length-1){
              obj.event_ids+=`${EventData.dataValues.event_id}`
              obj.event_names+=`${EventData.dataValues.event_name}`
            }else{
              obj.event_ids+=`${EventData.dataValues.event_id},`
              obj.event_names+=`${EventData.dataValues.event_name},`
            }
            
          }
        }
        tempCard.push(obj)
      }
      //批量更新card表
      const updateDate1=await this.Card.bulkCreate(tempCard,{ updateOnDuplicate:['event_ids','event_names','event_relation']})
    }
    if(indicObj.dataValues.table_ids){
      var tableArr=indicObj.dataValues.table_ids.split(',');
      var tempTable=[]
      for(let i=0;i<tableArr.length;i++){
        var obj={
          table_id:tableArr[i],
          event_ids:'',
          event_names:'',
          event_relation:1
        }
        const Events=await this.Table.findOne({
          where:{
            table_id:tableArr[i]
          },
          attributes:['events']
        })
        if(Events && Events.dataValues.events){
          const eventCodes=Events.dataValues.events.split(',');
          if(eventCodes.length>1){
            obj.event_relation=2
          }
          for(let j=0;j<eventCodes.length;j++){ 
            const EventData=await this.Event.findOne({
              where:{
                event_code:eventCodes[j]
              },
              attributes:['event_id','event_name']
            })
            if(j==eventCodes.length-1){
              obj.event_ids+=`${EventData.dataValues.event_id}`
              obj.event_names+=`${EventData.dataValues.event_name}`
            }else{
              obj.event_ids+=`${EventData.dataValues.event_id},`
              obj.event_names+=`${EventData.dataValues.event_name},`
            }
          }
        }
        tempTable.push(obj)
      }
      //批量更新card表
      const updateDate2=await this.Table.bulkCreate(tempTable,{ updateOnDuplicate:['event_ids','event_names','event_relation']})
    }
    if(indicObj.dataValues.trend_ids){
      var trendArr=indicObj.dataValues.trend_ids.split(',');
      var tempTrend=[]
      for(let i=0;i<trendArr.length;i++){
        var obj={
          trend_id:trendArr[i],
          event_ids:'',
          event_names:'',
          event_relation:1
        }
        const Events=await this.Trend.findOne({
          where:{
            trend_id:trendArr[i]
          },
          attributes:['events']
        })
        if(Events && Events.dataValues.events){
          const eventCodes=Events.dataValues.events.split(',');
          if(eventCodes.length>1){
            obj.event_relation=2
          }
          for(let j=0;j<eventCodes.length;j++){ 
            const EventData=await this.Event.findOne({
              where:{
                event_code:eventCodes[j]
              },
              attributes:['event_id','event_name']
            })
            if(j==eventCodes.length-1){
              obj.event_ids+=`${EventData.dataValues.event_id}`
              obj.event_names+=`${EventData.dataValues.event_name}`
            }else{
              obj.event_ids+=`${EventData.dataValues.event_id},`
              obj.event_names+=`${EventData.dataValues.event_name},`
            }
          }
        }
        tempTrend.push(obj)
      }
      //批量更新card表
      const updateDate3=await this.Trend.bulkCreate(tempTrend,{ updateOnDuplicate:['event_ids','event_names','event_relation']})
    }
    return this.ServerResponse.createBySuccessMsg('数据修改成功');
  }
  async downData(id,theFlag){
    const { ctx, app } = this;
		const Op = app.Sequelize.Op;
    //应用详情
    const appInfo = await this.Application.findOne({
      where: {
          application_id: id
      }
    })
    let flag = appInfo.dataValues.is_interactive == 1 ? true : false;
    var obj = `
    // 1、埋点操作手册-》首次使用务必先通读一遍操作手册
    http://fed.enbrands.com/buried-docs/sdkDocs/
    //2、初始化代码
    {
        is_prod: false,      // 数据埋入测试环境还是正式环境
        runtime_env:'',      //  参见埋点api
        merchant_id:'未知',   //  店铺ID   （也就是店铺号，便于通过不同店铺筛选数据 无法获取就写未知）
        distinct_id:'未知',   //  用户ID， （该字段是用来便于统计uv,一定要填写可标注用户唯一的字段）
        act_id:'未知',        //  活动ID   （也就是活动号，便于通过不同活动筛选数据，确认获取不到就传未知）
        member_id:'未知',     //  会员ID （确认获取不到就传未知）
        platform_app: "${appInfo.dataValues.platform_app}", 
        platform_app_code: "${appInfo.dataValues.platform_app_code}",
        platform_app_version:"${appInfo.dataValues.platform_app_version}",
        application_dep_platform:"${appInfo.dataValues.application_dep_platform}",
        platform_business:"${appInfo.dataValues.platform_business}",
        application_label:"${appInfo.dataValues.application_label}",
        is_interactive:${flag},
        nick:'未知',          //  确认获取不到就传未知
        mix_nick:'未知',      //  确认获取不到就传未知
        act_name:'未知',      //  确认获取不到就传未知
        open_id:'未知',       //  微信平台下请务必传入正确的open_id
        phone:'未知',         //  确认获取不到就传未知 
        ouid:'未知',          //  淘宝平台下请务必传入正确的ouid
        provider:'未知',      //  请传入提供者|未知
        open_type:1,         // 1对接新埋点平台，2互动营销类的，3其他
    }
    //3、需要埋入的事件代码
    `;
    //获取指标
    var arr=[];
    var theData='';
    arr = await this.ApplicationEvent.findAll({
      where: {application_id: id},
      attributes: ['event_id']
    })
    if(arr.length>0){
      var eventIds = []
      for (var i = 0; i < arr.length; i++) {
        eventIds.push({event_id:arr[i].event_id});
      }
      var objOption = {
        [Op.or]: eventIds,
      }
      var Eventarr = await this.Event.findAll({
        where: objOption,
      })
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
         theData=obj+str
        //取事件的方法
    } else{
      theData=obj
    }
    if(theFlag=='false'){
      return this.ServerResponse.requireData('查询成功', theData);
    } 
    const files = fs.readdirSync(this.app.config.static.dir);
    for(let z=0;z<files.length;z++){
      if(files[z]!='swagger'){
        var docName=files[z]
      }
    }
    var nowDate=sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    const filePath=path.resolve(this.app.config.static.dir, docName);
    var newPath=path.resolve(this.app.config.static.dir, `${appInfo.dataValues.platform_app}-${nowDate}-${appInfo.dataValues.create_people}.docx`);
    //return
    fs.renameSync(filePath,newPath);
    var buffer=Buffer.from(theData)
    fs.writeFileSync(newPath,theData,{encoding: 'utf8'})
    this.ctx.attachment(newPath);
    this.ctx.set('Content-Type',"application/octet-stream");
    //var a=fs.createReadStream(filePath)
    this.ctx.body=fs.createReadStream(newPath)
    var temp=null;
    var option={
      method:'POST',
      //data:temp,
      files:newPath,
      headers:{//自定义header
          "Accept": "*/*",
          "Content-Type":"application/json"
      },
      //rejectUnauthorized: false,
      dataType:'json'
  }
  var res = await this.ctx.curl('https://test-s3.zkyai.com/jzone_enbrands/bend/file-upload',option);
  const downUrl=res.data.data
  return this.ServerResponse.requireData('查询成功', downUrl);
  }
}
module.exports = Auxiliary;
