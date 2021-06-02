'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.TheUser=ctx.service.user;
   }
    async login(){
	  const ctx=this.ctx;
	  const response=await this.TheUser.login(ctx.request.body);
	  ctx.body=response;
    }
	async create(){
		const rule={
			username:{
				type:'username',
			},
			phone:{
				type:'phone',
			},
			password:'password'
		}
		const ctx=this.ctx;
		const sj=this.app.validator.validate(rule,ctx.request.body)
		//var para=ctx.params();
		if(sj){
			ctx.body={
				status:1,
				msg:`${sj[0].message}`
			}
			return
		}
		const response=await this.TheUser.create(ctx.request.body);
		ctx.body=response;
	}
	async list(){
		const ctx=this.ctx;
		const response=await this.TheUser.list(ctx.request.body);
		ctx.body=response;
	}
	async loginOut(){
		const ctx=this.ctx;
		const response=await this.TheUser.loginOut();
		ctx.body=response;
	}
	async isLogin(){
		const ctx=this.ctx;
		const response=await this.TheUser.isLogin();
		ctx.body=response;
	}
}
module.exports = UserController;
