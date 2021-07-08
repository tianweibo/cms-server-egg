'use strict';

const Service = require('egg').Service;
const jwt=require('jsonwebtoken')
class User extends Service {
  constructor(ctx){
	  super(ctx);
	  this.TheUser=ctx.model.User;
	  this.ResponseCode = ctx.response.ResponseCode;
	  this.ServerResponse = ctx.response.ServerResponse;
  }
  async login(userInfo){
	const hasUser=await this.TheUser.findOne({
		where:{
			username:userInfo.username,
			status:1
		}
	})
	if(hasUser==null){
		return this.ServerResponse.createByErrorCodeMsg('账号不存在');
	}
	const verify = await hasUser.validPassword(userInfo.password);
	if (!verify) {
		return this.ServerResponse.createByErrorCodeMsg('密码错误');
	}
	const token=jwt.sign({
		id:hasUser.dataValues.id,
		scope:hasUser.id
	},this.app.config.jwt.cert,{
		expiresIn:60*60*24
	})
	//await this.app.redis.set('userid', hasUser.dataValues.id);
	this.ctx.session.userid=hasUser.dataValues.id
	this.ctx.session.username=hasUser.dataValues.username;
	var info={
		data:hasUser.dataValues,
		token:token,
	}
	return this.ServerResponse.createBySuccessMsgAndData('登录成功',info)
  }
  async loginOut(){
	// const theid=await this.app.redis.del('userid')
	this.ctx.session.userid=null;
	this.ctx.session.username=null;
	return this.ServerResponse.createBySuccessMsg('退出成功')
  }
  async isLogin(){
	try {
		var decode = jwt.verify(this.ctx.get('Authorization'), this.ctx.app.config.jwt.cert)
	} catch (error) {
		if (error.name == 'TokenExpiredError'){
			return this.ServerResponse.requireData('token过期',{code:1});
		}
		return this.ServerResponse.requireData('授权失败，重新登陆',{code:1});
	}
	if(this.ctx.session.userid){
		const userObj=await this.TheUser.findOne({
			where:{
				id:this.ctx.session.userid
			}
		})
		if(userObj){
			return this.ServerResponse.requireData('查询成功', {code:0,data:userObj});
		}else{
			return this.ServerResponse.requireData('用户不存在',{code:1});
		} 
	}else{
		return this.ServerResponse.requireData('用户已退出',{code:1});
	}
	
  }
  async list(obj){
	const {ctx,app}=this;
	const Op = app.Sequelize.Op;
	var list={
		count:0,
		arr:[],
	}
	var objOption={
		username:{[Op.like]:`%${obj.keyword}%`},
		status:1
	}
	try{
		await this.TheUser.findAndCountAll({
			where:objOption,
			limit: parseInt(obj.pageSize),
			offset:parseInt((obj.pageNo-1) * obj.pageSize)
		}).then(function(result){
			list.count=result.count,
			list.arr=result.rows
		})
		return this.ServerResponse.requireData('查询成功', list);
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async create(user) {
	const hasUser=await this.TheUser.findOne({
		where:{
			username:user.username
		}
	})
	if(hasUser==null){
		const userInfo=await this.TheUser.create(user);
		if (!userInfo) {
			return this.ServerResponse.networkError('网络问题');
		}else{
			return this.ServerResponse.requireData('创建成功', {code:0});
		}
	}else{
		return this.ServerResponse.requireData('账号已存在,请换个名字试试',{code:1})
	}
  }
}
module.exports = User;
