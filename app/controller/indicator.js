'use strict';
const Controller = require('egg').Controller;
const {indicatorExcel}=require('../common/excelEnum.js')
class IndicatorController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.Indicator=ctx.service.indicator;
    this.IndicatorM=ctx.model.Indicator;
   }
    async list(){
	  const ctx=this.ctx;
	  const response=await this.Indicator.list(ctx.request.body);
	  ctx.body=response;
    }
    async listById(){
      const ctx=this.ctx;
	  const response=await this.Indicator.listById(ctx.request.body);
	  ctx.body=response;
    }
    async create(){
        const ctx=this.ctx;
        const response=await this.Indicator.create(ctx.request.body);
        ctx.body=response;
    }
    async update(){
        const ctx=this.ctx;
        const id = ctx.query.id;
        const body = ctx.request.body;
        const response=await this.Indicator.update({ id, updates: body });
        ctx.body=response;
    }
    async detail(){
        const ctx=this.ctx;
        const response=await this.Indicator.detail(ctx.query.id);
        ctx.body=response;
    }
    async archive(){ 
        const ctx=this.ctx;
        const response=await this.Indicator.archive(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async delete(){ 
        const ctx=this.ctx;
        const response=await this.Indicator.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async importIndicator() {
     const {ctx,app}=this;
     const file = ctx.request.files[0];
     // 中文表头转换为数据的key值，所使用的的映射map indicatorExcel
    try {
      // 每行数据要进行的特殊处理函数
      const rowTransform = (row) => ({
        ...row,
         // general_attr: row.general_attr.toString(),
         //userGroups: row.userGroups ? row.userGroups.split(/,|，/) : [],
      });
      //indicator_code 的唯一性判定
      const Op = app.Sequelize.Op;
      var arr=[];
      const userData = ctx.helper.excelData(file, indicatorExcel, rowTransform);
      if(userData.length>0){
        for(var i=0;i<userData.length;i++){
            arr.push({
                indicator_code:{[Op.eq]:userData[i].indicator_code}
            })
        }
        var objOption={
            [Op.or]:arr,
        }
        try{
            const temp=await this.IndicatorM.findAndCountAll({
                where:objOption,
            }).then(function(result){
                if(result.count>0){
                    var str=''
                    for(var i=0;i<result.rows.length;i++){
                        str+=result.rows[i].indicator_code+','
                    } 
                    var obj={
                        num:result.count,
                        str:str
                    }
                    return obj
                }
            })
            if(temp.num>0){
                ctx.body={
                    status:1,
                    msg:`${temp.str}这些指标代码已存在,请核对后再导入`
                } 
                return
            }
        }catch(e){
            //console.log('error')
        }
      }else{
          ctx.body={
            status:1,
            msg:`模板中数据不能为空`
          }
          return
      }
     const response = await this.Indicator.importIndicator(userData);
     ctx.body = response;
      return;
    } catch (error) {
      ctx.badRequest({
        data: {},
        msg: error.errmsg,
      });
    }
  }



}
module.exports = IndicatorController;
