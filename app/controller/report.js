'use strict';
const Controller = require('egg').Controller;
class ReportController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
    this.Report=ctx.service.report;
   }
    async create(){
	  const ctx=this.ctx;
	  const response=await this.Report.create(ctx.request.body);
	  ctx.body=response;
    }
    async update() {
        const ctx=this.ctx;
        const id = ctx.query.id;
        const body = ctx.request.body;
        const response=await this.Report.update({ id, updates: body });
        ctx.body=response;
    }
    async list(){  
        const ctx=this.ctx;
        const response=await this.Report.list(ctx.request.body);
        ctx.body=response;
    }
    async detail(){
        const ctx=this.ctx;
        const response=await this.Report.detail(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async delete(){ 
        const ctx=this.ctx;
        const response=await this.Report.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
}
module.exports = ReportController;
