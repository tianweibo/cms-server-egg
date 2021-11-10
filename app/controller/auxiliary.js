'use strict';
const Controller = require('egg').Controller;
class AuxiliaryController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.TheAuxiliary=ctx.service.auxiliary;
   }
    async repairData(){
	  const ctx=this.ctx;
	  const response=await this.TheAuxiliary.repairData(ctx.request.body);
	  ctx.body=response;
    }
	async downData(){
	  const ctx=this.ctx;
	  const response=await this.TheAuxiliary.downData(ctx.query.id,ctx.query.flag);
	  ctx.body=response;
	}
	async repairReportIndic(){
	  const ctx=this.ctx;
	  const response=await this.TheAuxiliary.repairReportIndic(ctx.query.id);
	  ctx.body=response;
	}
	async giveDataForAppEvent(){
		const ctx=this.ctx;
		const response=await this.TheAuxiliary.giveDataForAppEvent(ctx.helper.parseInt(ctx.query.id));
		ctx.body=response;
	}
}
module.exports = AuxiliaryController;
