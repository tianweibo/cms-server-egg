'use strict';
const path = require("path");
const fs = require("fs");
const sd = require('silly-datetime');
const Service = require('egg').Service;
class Application extends Service {
    constructor(ctx) {
        super(ctx);
        this.Application = ctx.model.Application;
        this.Event = ctx.model.Event;
        this.ApplicationIndicator = ctx.model.ApplicationIndicator;
        this.IndicatorEvent = ctx.model.IndicatorEvent
        this.Indicator = ctx.model.Indicator;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
    }
    async update(data) {
        const appInfo = await this.Application.findOne({
            where: {
                application_id: data.id
            }
        })
        if (appInfo == null) {
            return this.ServerResponse.requireData('应用不存在', { code: 1 })
        } else {
            var obj = data.updates;
            obj.info.update_people = this.ctx.session.username;
            obj.info['update_time']=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            const thedata = await this.Application.update(obj.info, {
                where: {
                    application_id: data.id
                }
            })
            if (thedata) {
                var data1 = [];
                for (var i = 0; i < data.updates.indicatorArr.length; i++) {
                    var obj = {
                        application_id: data.id,
                        indicator_id: data.updates.indicatorArr[i]
                    }
                    data1.push(obj)
                }
                await this.ApplicationIndicator.destroy({ where: { application_id: data.id } });
                const eventAppInfo = await this.ApplicationIndicator.bulkCreate(data1, { updateOnDuplicate: ["application_id"] })
                if (!eventAppInfo) {
                    return this.ServerResponse.networkError('网络问题');
                } else {
                    return this.ServerResponse.requireData('更新成功', { code: 0 });
                }

            } else {
                return this.ServerResponse.networkError('网络问题');
            }
        }
    }
    async create(app) {
        const hasApp = await this.Application.findOne({
            where: {
                platform_app_code: app.info.platform_app_code
            }
        })
        if (hasApp == null) {
            const appInfo = await this.Application.create(app.info);
            if (appInfo) {
                if (app.indicatorArr.length > 0) {
                    var data = [];
                    for (var i = 0; i < app.indicatorArr.length; i++) {
                        var obj = {
                            application_id: appInfo.dataValues.application_id,
                            indicator_id: app.indicatorArr[i]
                        }
                        data.push(obj)
                    }
                    const tempInfo = await this.ApplicationIndicator.bulkCreate(data)
                    if (!tempInfo) {
                        return this.ServerResponse.networkError('网络问题');
                    } else {
                        return this.ServerResponse.requireData('注册成功', { code: 0 });
                    }
                } else {
                    return this.ServerResponse.requireData('注册成功', { code: 0 });
                }
            } else {
                return this.ServerResponse.networkError('网络问题');
            }
        } else {
            return this.ServerResponse.requireData('应用英文代码已存在,请换个再试试', { code: 1 })
        }
    }
    async detail(id) {
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        const appInfo = await this.Application.findOne({
            where: {
                application_id: id
            }
        })
        const arr = await this.ApplicationIndicator.findAll({
            where: {
                application_id: id
            },
            attributes: ['indicator_id']
        })
        var indicatorIds = []
        for (var i = 0; i < arr.length; i++) {
            indicatorIds.push(arr[i].indicator_id);
        }
        if (appInfo == null) {
            return this.ServerResponse.requireData('应用不存在', { code: 1 });
        } else {
            var appObj = {
                appInfo, indicatorIds
            }
            return this.ServerResponse.requireData('查询成功', { code: 0, data: appObj });
        }
    }
    async detailByIndicator(data) {  //应用下的指标
        var dataArr = [];
        if (data && data.id.length > 0) {
            for (var i = 0; i < data.id.length; i++) {
                dataArr.push({
                    indicator_id: data.id[i]
                })
            }
        }
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        var objOption = {
            [Op.or]: dataArr,
        }
        var indicatorInfo = await this.Indicator.findAll({
            where: objOption,
        })
        if (indicatorInfo == null) {
            return this.ServerResponse.requireData('指标不存在', { code: 1 });
        } else {
            return this.ServerResponse.requireData('查询成功', { code: 0, indicatorInfo });
        }
    }

    async detailByEvent(data) {  //指标下的事件
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;                     //查找出指标下的事件，
        var data1 = [];
        if (data && data.id.length > 0) {
            var idArr = data.id;
            for (var i = 0; i < idArr.length; i++) {
                data1.push({
                    indicator_id: idArr[i]
                })
            }
        }
        var objOption = {
            [Op.or]: data1,
        }
        const arr1 = await this.IndicatorEvent.findAll({ //事件去重（不去重也行）后按IDS获取详情
            where: objOption,
            attributes: ['event_id']
        })

        var eventIds = [];
        for (var i = 0; i < arr1.length; i++) {
            eventIds.push(arr1[i].event_id);
        }
        //通过事件IDs 查找事件的列表-去重
        /* var eventIds= arr1.filter(function (item, index, arr) {
            return arr1.indexOf(item, 0) === index;
        }); */
        var data2 = [];
        if (eventIds && eventIds.length > 0) {
            for (var i = 0; i < eventIds.length; i++) {
                data2.push({
                    event_id: eventIds[i]
                })
            }
        }
        var objOption = {
            [Op.or]: data2,
        }
        try {
            var arr = await this.Event.findAll({
                where: objOption,
            })
            return this.ServerResponse.requireData('查询成功', arr);
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
        if (obj.application_label) {
            arr.push({
                application_label: obj.application_label,
            })
        }
        if (obj.platform_business) {
            arr.push({
                platform_business: obj.platform_business,
            })
        }
        arr.push({
            is_interactive: obj.is_interactive,
        })
        var objOption = {
            [Op.or]: [{
                platform_app: { [Op.like]: `%${obj.keyword}%` }
            }, {
                platform_app_code: { [Op.like]: `%${obj.keyword}%` }
            }],
            [Op.and]: arr
        }
        try {
            await this.Application.findAndCountAll({
                where: objOption,
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
    async useful(id) {
        try {
            const result = await this.Application.findOne({
                where: { application_id: id },
            });
            if (!result) {
                return this.ServerResponse.requireData('应用不存在', { code: 1 });
            }
            const row = await this.Application.update({
                state: 0,
            }, { where: { application_id: id }, individualHooks: true });

            if (row) {
                return this.ServerResponse.requireData('停用成功', { code: 0 });
            } else {
                return this.ServerResponse.requireData('停用失败', { code: 1 });
            }
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async delete(id) {
        try {
            const result = await this.Application.findOne({
                where: { application_id: id },
            });
            if (!result) {
                return this.ServerResponse.requireData('应用不存在', { code: 1 });
            }
            const row = await this.Application.destroy({ where: { application_id: id } });
            if (row) {
                return this.ServerResponse.requireData('删除成功', { code: 0 });
            } else {
                return this.ServerResponse.requireData('删除失败', { code: 1 });
            }
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
}
module.exports = Application;
