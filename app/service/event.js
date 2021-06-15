'use strict';
const path = require("path");
const fs=require("fs");
const Service = require('egg').Service;
class Event extends Service {
  constructor(ctx){
	  super(ctx);
	  this.Event=ctx.model.Event;
      this.EventAttribute=ctx.model.EventAttribute;
      this.Attribute=ctx.model.Attribute;
	  this.ResponseCode = ctx.response.ResponseCode;
	  this.ServerResponse = ctx.response.ServerResponse;
  }
  async update(data){
	const eventInfo=await this.Event.findOne({
		where:{
			event_id:data.id
		}
	})
	if(eventInfo==null){
		return this.ServerResponse.requireData('事件不存在',{code:1})
	}else{
        var obj=data.updates;
        obj.update_people=this.ctx.session.username;
		const thedata=await this.Event.update(obj.info,{
			where:{
				event_id:data.id
			}
		})
        if(thedata){
            if(data.updates.attributeArr.length>0){
                var data1=[];
                for(var i=0;i<data.updates.attributeArr.length;i++){
                    var obj={
                        event_id:data.id,
                        attribute_id:data.updates.attributeArr[i]
                    }
                    data1.push(obj)
                }
                await this.EventAttribute.destroy({ where: { event_id: data.id} });
                const eventAttributeInfo=await this.EventAttribute.bulkCreate(data1,{updateOnDuplicate:["event_id"]})
		        if (!eventAttributeInfo) {
			        return this.ServerResponse.networkError('网络问题');
		        }else{
			        return this.ServerResponse.requireData('更新成功', {code:0});
		        }
            }else{
                return this.ServerResponse.requireData('事件修改失败',{code:1})
            }
        }else{
            return this.ServerResponse.networkError('网络问题');
        }
	}
  }
  async create(event) {
	const hasEvent=await this.Event.findOne({
		where:{
			event_code:event.info.event_code
		}
	})
	if(hasEvent==null){
		const eventInfo=await this.Event.create(event.info);
        if(eventInfo){
            if(event.attributeArr){
                var data=[];
                for(var i=0;i<event.attributeArr.length;i++){
                    var obj={
                        event_id:eventInfo.dataValues.event_id,
                        attribute_id:event.attributeArr[i]
                    }
                    data.push(obj)
                }
                const eventAttributeInfo=await this.EventAttribute.bulkCreate(data)
		        if (!eventAttributeInfo) {
			        return this.ServerResponse.networkError('网络问题');
		        }else{
			        return this.ServerResponse.requireData('注册成功', {code:0});
		        }
            }else{
                return this.ServerResponse.requireData('注册成功', {code:0});
            }
        }else{
            return this.ServerResponse.networkError('网络问题');
        }
	}else{
		return this.ServerResponse.requireData('事件英文代码已存在,请换个再试试',{code:1})
	}
  }
  async detail(id){
	const {ctx,app}=this;
	const Op = app.Sequelize.Op;
   
	const eventInfo=await this.Event.findOne({
		where:{
			event_id:id
		} 
	})
    const idArr=await this.EventAttribute.findAll({
        where:{
            event_id:id
        },
        attributes:['attribute_id']
    })
    var dataArr=[];
    if(idArr && idArr.length>0){
        for(var i=0;i<idArr.length;i++){
            dataArr.push({
                attribute_id:idArr[i].attribute_id
            })
        }
    }
    var objOption={
		[Op.or]:dataArr,
	}
    var attrInfo=await this.Attribute.findAll({
        where:objOption,
    })
	if(eventInfo==null){
		return this.ServerResponse.requireData('事件不存在',{code:1});
	}else{
		var eventObj={
            eventInfo,attrInfo
		}
		return this.ServerResponse.requireData('查询成功', {code:0,data:eventObj});
	}
  }
  async list(obj){
	const {ctx,app}=this;
	const Op = app.Sequelize.Op;
	var list={
		count:0,
		arr:[],
	}
    var arr=[];
    if(obj.event_label){
        arr.push({
			event_label:obj.event_label,
		})
    }
    if(obj.event_trigger_mode){
        arr.push({
			event_trigger_mode:obj.event_trigger_mode,
		})
    }
	var objOption={
        [Op.or]:[{
			event_name:{[Op.like]:`%${obj.keyword}%`}
		},{
			event_code:{[Op.like]:`%${obj.keyword}%`}
		}],
        [Op.and]:arr
	}
	try{
		await this.Event.findAndCountAll({
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
  async archive(id){
	try{
		const result = await this.Event.findOne({
			where: { event_id: id },
		});
		if (!result) {
			return this.ServerResponse.requireData('项目不存在',{code:1});
		}
		const row= await this.Event.update({
			state: 0,
		}, { where: { event_id: id}, individualHooks: true });
		
		if(row) {
			return this.ServerResponse.requireData('删除成功',{code:0});
		}else{
			return this.ServerResponse.requireData('删除失败',{code:1});
		}
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async delete(id){
	try{
		const result = await this.Event.findOne({
			where: { event_id: id },
		});
		if (!result) {
			return this.ServerResponse.requireData('项目不存在',{code:1});
		}
		const row= await this.Event.destroy({ where: { event_id: id} });
		if(row) {
			return this.ServerResponse.requireData('归档成功',{code:0});
		}else{
			return this.ServerResponse.requireData('归档失败',{code:1});
		}
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async importEvent(data) {
    const eventInfo=await this.Event.bulkCreate(data);
    if(eventInfo){
        return this.ServerResponse.requireData('导入成功', {code:0});
    }else{
        return this.ServerResponse.networkError('网络问题');
    }
  }
}
module.exports = Event;
