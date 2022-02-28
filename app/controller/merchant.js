'use strict';
const Controller = require('egg').Controller;
class MerchantController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.ProductLine=ctx.service.merchant;
   }
	
	async merchantListOfid(){
		const ctx=this.ctx;
		const response=await this.ProductLine.merchantListOfid(ctx.request.body);
		ctx.body=response;
	}
}
module.exports = MerchantController;
