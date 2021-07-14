'use strict';
const Controller = require('egg').Controller;
class TheLabel extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.TheLabel=ctx.service.TheLabel;
   }
    async createParent(){
	  const ctx=this.ctx;
	  const response=await this.TheLabel.createParent(ctx.request.body);
	  ctx.body=response;
    }
    async createSon(){
        const ctx=this.ctx;
        const response=await this.TheLabel.createSon(ctx.request.body);
        ctx.body=response;
      }
    async update() {
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.query.id);
        const body = ctx.request.body;
        ctx.body = await this.TheLabel.update({ id, updates: body });
    }
    async list(){  //待测试
        const ctx=this.ctx;
        const response=await this.TheLabel.list(ctx.request.body);
        ctx.body=response;
    }
    async delete(){  //待测试
        const ctx=this.ctx;
        const response=await this.TheLabel.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async labelType(){ //待测试
        const ctx=this.ctx;
        const response=await this.TheLabel.labelType();
        ctx.body=response;
    }
}
module.exports = TheLabel;
