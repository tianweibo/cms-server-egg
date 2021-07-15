'use strict';

const Service = require('egg').Service;
class TheLabel extends Service {
  constructor(ctx){
	  super(ctx);
	  this.TheLabel=ctx.model.TheLabel;
	  this.ResponseCode = ctx.response.ResponseCode;
	  this.ServerResponse = ctx.response.ServerResponse;	  
  }
  
  async createParent(project) {
    var data=[
        {
            fid:0,
            fname:'一级',
            label:'其他',
            is_lower:0,
            value:''  ,//前端生成
        },{
            fid:'',    //父级标签value
            fname:'一级',//父级标签label
            label:'其他',
            is_lower:1,
            value:''  ,//前端生成
        },{

        }
    ] //校验数据的重复
	const hasProject=await this.TheLabel.findOne({
		where:{
			project_name:project.project_name
		}
	})
	if(hasProject==null){
		var project1=project
		project1['username']=this.ctx.session.username;
		const projectInfo=await this.TheLabel.create(project1);
		if (!projectInfo) {
			return this.ServerResponse.networkError('网络问题');
		}else{
			var projectInfo1 = projectInfo.toJSON();
			return this.ServerResponse.requireData('创建成功', {code:0});
		}
	}else{
		return this.ServerResponse.requireData('项目已存在,请换个名字试试',{code:1})
	}
  }
  async calcNumber(data){
    var data=[{
        label_id:'',
        type:'add',
    }]
  }
  async createSon(project) {
    var data=[
        {
            fid:0,
            fname:'一级',
            label:'其他',
            is_lower:0,
            value:''  ,//前端生成
        },{
            fid:'',    //父级标签value
            fname:'一级',//父级标签label
            label:'其他',
            is_lower:1,
            value:''  ,//前端生成
        },{

        }
    ] //校验数据的重复
	const hasProject=await this.TheLabel.findOne({
		where:{
			project_name:project.project_name
		}
	})
	if(hasProject==null){
		var project1=project
		project1['username']=this.ctx.session.username;
		const projectInfo=await this.TheLabel.create(project1);
		if (!projectInfo) {
			return this.ServerResponse.networkError('网络问题');
		}else{
			var projectInfo1 = projectInfo.toJSON();
			return this.ServerResponse.requireData('创建成功', {code:0});
		}
	}else{
		return this.ServerResponse.requireData('项目已存在,请换个名字试试',{code:1})
	}
  }
  async delete(id){
	try{
		const result = await this.TheLabel.findOne({
			where: {id: id},
		});
		if (!result) {
			return this.ServerResponse.requireData('标签不存在',{code:1});
		}
		const row = await this.TheLabel.destroy({ where: {id: id } });
		if (row) {
			return this.ServerResponse.requireData('删除成功', { code: 0 });
		} else {
			return this.ServerResponse.requireData('删除失败', { code: 1 });
		}
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
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
		label:{[Op.like]:`%${obj.keyword}%`},
		id:obj.id
	}
	try{
		await this.TheLabel.findAndCountAll({
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
  async update(data){
	const projectInfo=await this.TheLabel.findOne({
		where:{
			project_id:data.id
		}
	})
	if(projectInfo==null){
		return this.ServerResponse.requireData('项目不存在',{code:1})
	}else{
		const thedata=await this.TheLabel.update(data.updates,{
			where:{
				project_id:data.id
			}
		})
		if(thedata[0]==1){
			return this.ServerResponse.requireData('修改成功', {code:0});
		}else{
			return this.ServerResponse.requireData('项目修改失败',{code:1})
		}
	}
  }
  async labelType(){
	try{
		const result = await this.TheLabel.findOne({
			where: {fid: 0},
		});
		if (!result) {
			return this.ServerResponse.requireData('数据不存在',{code:1});
		}else{
            return this.ServerResponse.requireData('获取成功', { code: 0 ,data:result});
        }
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
}
module.exports = TheLabel;
