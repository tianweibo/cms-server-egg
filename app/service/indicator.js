'use strict';
const Service = require('egg').Service;
const sd = require('silly-datetime');
class Indicator extends Service {
    constructor(ctx) {
        super(ctx);
        this.Indicator = ctx.model.Indicator;
        this.IndicatorEvent = ctx.model.IndicatorEvent;
        this.ApplicationIndicator = ctx.model.ApplicationIndicator;
        this.Event = ctx.model.Event;
        this.Application = ctx.model.Application;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
    }
    async update(data) {
        const indicatorInfo = await this.Indicator.findOne({
            where: {
                indicator_id: data.id
            }
        })
        if (indicatorInfo == null) {
            return this.ServerResponse.requireData('指标不存在', { code: 1 })
        } else {
            var obj = data.updates;
            obj.info.update_people = this.ctx.session.username;
            obj.info['update_time']=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            const thedata = await this.Indicator.update(obj.info, {
                where: {
                    indicator_id: data.id
                }
            })
            if (thedata) {
                if(data.updates.eventArr){
                    var data1 = [];
                for (var i = 0; i < data.updates.eventArr.length; i++) {
                    var obj = {
                        indicator_id: data.id,
                        event_id: data.updates.eventArr[i]
                    }
                    data1.push(obj)
                }
                await this.IndicatorEvent.destroy({ where: { indicator_id: data.id } });
                const eventIndicatorInfo = await this.IndicatorEvent.bulkCreate(data1, { updateOnDuplicate: ["indicator_id"] })
                if (!eventIndicatorInfo) {
                    return this.ServerResponse.networkError('网络问题');
                }
                }
                if(data.updates.appArr){
                    var data2 = [];
                    for (var i = 0; i < data.updates.appArr.length; i++) {
                        var obj = {
                            indicator_id: data.id,
                            application_id: data.updates.appArr[i]
                        }
                        data2.push(obj)
                    }
                    await this.ApplicationIndicator.destroy({ where: { indicator_id: data.id } });
                    const appIndicatorInfo = await this.ApplicationIndicator.bulkCreate(data2, { updateOnDuplicate: ["indicator_id"] })
                    if (!appIndicatorInfo) {
                        return this.ServerResponse.networkError('网络问题');
                    }
                }
                return this.ServerResponse.requireData('更新成功', { code: 0 });
            } else {
                return this.ServerResponse.networkError('网络问题');
            }
        }
    }
    async create(indicator) {
        const hasIndicator = await this.Indicator.findOne({
            where: {
                indicator_code: indicator.info.indicator_code
            }
        })
        if (hasIndicator == null) {
            indicator.info.create_people = this.ctx.session.username;
            const indicatorInfo = await this.Indicator.create(indicator.info);
            if (indicatorInfo) {
                if(indicator.eventArr){
                    var data = [];
                    for (var i = 0; i < indicator.eventArr.length; i++) {
                        var obj = {
                            indicator_id: indicatorInfo.dataValues.indicator_id,
                            event_id: indicator.eventArr[i]
                        }
                        data.push(obj)
                    }
                    const eventIndicatorInfo = await this.IndicatorEvent.bulkCreate(data)
                    if (!eventIndicatorInfo) {
                        return this.ServerResponse.networkError('网络问题');
                    }
                }
                var data = [];
                if(indicator.appArr){
                    for (var i = 0; i < indicator.appArr.length; i++) {
                        var obj = {
                            indicator_id: indicatorInfo.dataValues.indicator_id,
                            application_id: indicator.appArr[i]
                        }
                        data.push(obj)
                    }
                    const eventAppInfo = await this.ApplicationIndicator.bulkCreate(data)
                  if (!eventAppInfo) {
                    return this.ServerResponse.networkError('网络问题');
                   }
                }
                return this.ServerResponse.requireData('创建成功', { code: 0 });
            } else {
                return this.ServerResponse.networkError('网络问题');
            }
        } else {
            return this.ServerResponse.requireData('指标英文代码已存在,请换个再试试', { code: 1 })
        }
    }
    async detail(id) {
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;

        const indicatorInfo = await this.Indicator.findOne({
            where: {
                indicator_id: id
            }
        })
        const idEventArr = await this.IndicatorEvent.findAll({
            where: {
                indicator_id: id
            },
            attributes: ['event_id']
        })
        var dataEventArr = [];
        if (idEventArr && idEventArr.length > 0) {
            for (var i = 0; i < idEventArr.length; i++) {
                dataEventArr.push({
                    event_id: idEventArr[i].event_id
                })
            }
        }
        var objOption = {
            [Op.or]: dataEventArr,
        }
        var eventInfo = await this.Event.findAll({
            where: objOption,
        })
        const idAPPArr = await this.ApplicationIndicator.findAll({
            where: {
                indicator_id: id
            },
            //attributes: ['application_id']
        })
        var dataAppArr = [];
        if (idAPPArr && idAPPArr.length > 0) {
            for (var i = 0; i < idAPPArr.length; i++) {
                dataAppArr.push({
                    application_id: idAPPArr[i].application_id
                })
            }
        }
        var objOption1 = {
            [Op.or]: dataAppArr,
        }
        var appInfo = await this.Application.findAll({
            where: objOption1,
        })


        if (indicatorInfo == null) {
            return this.ServerResponse.requireData('指标不存在', { code: 1 });
        } else {
            var eventObj = {
                indicatorInfo, eventInfo, appInfo
            }
            return this.ServerResponse.requireData('查询成功', { code: 0, data: eventObj });
        }
    }
    async listById(id) {      //id 数组
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        var data = [];
        if (id && id.id.length > 0) {
            var idArr = id.id;
            for (var i = 0; i < idArr.length; i++) {
                data.push({
                    indicator_id: idArr[i]
                })
            }
        }
        var objOption = {
            [Op.or]: data,
        }
        try {
            var arr = await this.Indicator.findAll({
                where: objOption,
            })
            return this.ServerResponse.requireData('查询成功', arr);
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async listByType(obj){
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        var arr=[]
        if (obj.indicator_type) {
            arr.push({
                indicator_type: obj.indicator_type,
            })
        }
        if (obj.indicator_level) {
            arr.push({
                indicator_level: obj.indicator_level,
            })
        }
        var objOption = {
            [Op.and]: arr
        }
        try {
            var arr1 = await this.Indicator.findAll({
                where: objOption,
                attributes: ['indicator_id', 'indicator_name', 'indicator_code']
            })
            return this.ServerResponse.requireData('查询成功', arr1);
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async list(obj) {
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        var list = {
            count: 0,
            arr: [],
        }
        var arr = [];
        arr.push({
			state:1
		})
        if (obj.indicator_label) {
            arr.push({
                indicator_label: obj.indicator_label,
            })
        }
        if (obj.indicator_type) {
            arr.push({
                indicator_type: obj.indicator_type,
            })
        }
        var objOption = {
            [Op.or]: [{
                indicator_name: { [Op.like]: `%${obj.keyword}%` }
            }, {
                indicator_code: { [Op.like]: `%${obj.keyword}%` }
            }],
            [Op.and]: arr
        }
        try {
            await this.Indicator.findAndCountAll({
                where: objOption,
                //order: "create_time",
                order: [
                    ['create_time', 'DESC'] //降序desc，升序asc
                ],
                limit: parseInt(obj.pageSize),
                offset: parseInt((obj.pageNo - 1) * obj.pageSize)
            }).then(function (result) {
                    list.count = result.count,
                    list.arr = result.rows
            })
            return this.ServerResponse.requireData('查询成功', list);
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async archive(id) {
        try {
            const result = await this.Indicator.findOne({
                where: { indicator_id: id },
            });
            if (!result) {
                return this.ServerResponse.requireData('指标不存在', { code: 1 });
            }
            const eventArr = await this.IndicatorEvent.findAll({
                where: {
                    indicator_id: id
                },
                attributes: ['event_id']
            })
            const appArr = await this.ApplicationIndicator.findAll({
                where: {
                    indicator_id: id
                },
                attributes: ['application_id']
            })
            if(eventArr.length!=0){
                return this.ServerResponse.requireData('该指标有关联的有效事件,不支持归档指标，请解除事件关联再进行操作', { code: 1 });
            }
            if(appArr.length!=0){
                return this.ServerResponse.requireData('该指标有关联的有效应用,不支持归档指标，请解除应用关联再进行操作', { code: 1 });
            }
            const row = await this.Indicator.update({
                state: 0,
            }, { where: { indicator_id: id }, individualHooks: true });

            if (row) {
                return this.ServerResponse.requireData('归档成功', { code: 0 });
            } else {
                return this.ServerResponse.requireData('归档失败', { code: 1 });
            }
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async delete(id) {
        try {
            const result = await this.Indicator.findOne({
                where: { indicator_id: id },
            });
            if (!result) {
                return this.ServerResponse.requireData('指标不存在', { code: 1 });
            }
            const eventArr = await this.IndicatorEvent.findAll({
                where: {
                    indicator_id: id
                },
                attributes: ['event_id']
            })
            const appArr = await this.ApplicationIndicator.findAll({
                where: {
                    indicator_id: id
                },
                attributes: ['application_id']
            })
            if(eventArr.length!=0){
                return this.ServerResponse.requireData('该指标有关联的有效事件,不支持删除指标，请解除事件关联再进行操作', { code: 1 });
            }
            if(appArr.length!=0){
                return this.ServerResponse.requireData('该指标有关联的有效应用,不支持删除指标，请解除应用关联再进行操作', { code: 1 });
            }
            const row = await this.Indicator.destroy({ where: { indicator_id: id } });
            if (row) {
                return this.ServerResponse.requireData('删除成功', { code: 0 });
            } else {
                return this.ServerResponse.requireData('删除失败', { code: 1 });
            }
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async importIndicator(data) {
        const indicatorInfo = await this.Indicator.bulkCreate(data);
        if (indicatorInfo) {
            return this.ServerResponse.requireData('导入成功', { code: 0 });
        } else {
            return this.ServerResponse.networkError('网络问题');
        }
    }
}
module.exports = Indicator;
