'use strict';
const sd = require('silly-datetime');
const Service = require('egg').Service;
class Merchant extends Service {
  constructor(ctx){
	  super(ctx);
	  this.Merchant=ctx.model.Merchant;
      this.ServerResponse = ctx.response.ServerResponse;
	  this.ResponseCode = ctx.response.ResponseCode;
  }
  
  async merchantListOfid(obj){
    let arr=obj.id
	const {ctx,app}=this;
	const Op = app.Sequelize.Op;
    var dataArr = [];
    if(arr && arr.length>0){
        for (var i = 0; i < arr.length; i++) {
            dataArr.push({
                merchant_id: arr[i]
            })
        }
    }
    console.log(dataArr,'dataArr')
	var objOption={
        [Op.or]: dataArr
	}
	try{
		var list=await this.Merchant.findAll({
			where:objOption,
		})
		if (list.length==0) {
			return this.ServerResponse.requireData('查询成功');
		} else {
           let obj={}
           for(let i=0;i<list.length;i++){
             obj[list[i].merchant_id]=list[i].merchant_name
           }
			return this.ServerResponse.requireData('查询成功',  obj);
		}
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
  
  
  

  
}
module.exports = Merchant;
