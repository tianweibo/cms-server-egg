'use strict';
const Service = require('egg').Service;
const sd = require('silly-datetime');
class Report extends Service {
    constructor(ctx) {
        super(ctx);
        this.Report = ctx.model.Report;
        this.ReportBetween=ctx.model.ReportBetween;
        this.Card=ctx.model.Card;
        this.Application=ctx.model.Application;
        this.Table=ctx.model.Table;
        this.Trend=ctx.model.Trend;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
    }
    async update(data) {
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        try{
            var data={
                id:11, //报告ID
                updates:{
                    card_ids:[
                        {
                            indicator_id: null,
                            indicator_name: "car11d5",
                            indicator_show_name: null,
                            indicator_desc: null,
                            time_dimension: null,
                            time_dimension_label: null,
                            sequential: null,
                            sequential_label: null,
                            indicator_level: null,
                            indicator_level_label: null,
                        },{
                        indicator_id: null,
                        indicator_name: "card511",
                        indicator_show_name: null,
                        indicator_desc: null,
                        time_dimension: null,
                        time_dimension_label: null,
                        sequential: null,
                        sequential_label: null,
                        indicator_level: null,
                        indicator_level_label: null,
                    },{
                        indicator_id: null,
                        indicator_name: "card6",
                        indicator_show_name: null,
                        indicator_desc: null,
                        time_dimension: null,
                        time_dimension_label: null,
                        sequential: null,
                        sequential_label: null,
                        indicator_level: null,
                        indicator_level_label: null,
                    }],
                    table_ids:[
    
                    ],
                    trend_ids:[],
                    reportInfo:{}
                },
            }
            var obj = data.updates;
            obj.reportInfo.update_people = this.ctx.session.username;
            obj.reportInfo['update_time'] = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            const thedata = await this.Report.update(obj.reportInfo, {
                where: {
                    report_id: data.id
                }
            })
            if(thedata){
                var enumObj1={
                    'card_ids':this.Card,
                    'table_ids':this.Table,
                    'trend_ids':this.Trend
                }
                var enumObj2={
                    'card_ids':'card_id',
                    'table_ids':'table_id',
                    'trend_ids':'trend_id'
                }
                var obj=data.updates;
                var reportBetween = await this.ReportBetween.findOne({
                    where: {
                        report_id: data.id
                    },
                    attributes:['card_ids','table_ids','trend_ids']
                })
                for(let key  in obj){
                    if(key!='reportInfo'){
                        var theObj={};
                        if(reportBetween.dataValues[key]){
                            var deleteIds=reportBetween.dataValues[key].split(',').map(Number);
                            theObj[enumObj2[key]]={[Op.in]:deleteIds};
                            await enumObj1[key].destroy({where:theObj})
                        }
                        var ids=await enumObj1[key].bulkCreate(obj[key],{updateOnDuplicate:[enumObj2[key]]});
                        if(ids.length>0){
                            var newIds=[];
                            for(var i=0;i<ids.length;i++){
                                newIds.push(ids[i][enumObj2[key]])
                            }
                            await this.ReportBetween.update({
                                [key]: newIds.join(','),
                            }, { where: { report_id: data.id }, individualHooks: true });
                        }
                    }
                }
            }else{
                return this.ServerResponse.networkError('网络问题');
            }
            return this.ServerResponse.createBySuccessMsgAndData('编辑成功', { code: 0 })
        }catch(e){
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async create1(data) {
        var data={
            application_id:81,
            create_people:this.ctx.session.username
        };
        const reportInfo = await this.Report.create(data);//获取应用下的所有指标 
        var temp={
            application_id:reportInfo.application_id,
            report_id:reportInfo.report_id
        }
        return this.ServerResponse.createBySuccessMsgAndData('创建成功',temp)
    }
    async create(data){
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        try{
            var data={
                id:81, //应用ID
                updates:{
                    card_ids:[{
                        indicator_id: null,
                        indicator_name: "card51111",
                        indicator_show_name: null,
                        indicator_desc: null,
                        time_dimension: null,
                        time_dimension_label: null,
                        sequential: null,
                        sequential_label: null,
                        indicator_level: null,
                        indicator_level_label: null,
                    },{
                        indicator_id: null,
                        indicator_name: "card511",
                        indicator_show_name: null,
                        indicator_desc: null,
                        time_dimension: null,
                        time_dimension_label: null,
                        sequential: null,
                        sequential_label: null,
                        indicator_level: null,
                        indicator_level_label: null,
                    },{
                        indicator_id: null,
                        indicator_name: "card611",
                        indicator_show_name: null,
                        indicator_desc: null,
                        time_dimension: null,
                        time_dimension_label: null,
                        sequential: null,
                        sequential_label: null,
                        indicator_level: null,
                        indicator_level_label: null,
                    }],
                    table_ids:[],
                    trend_ids:[],
                    reportInfo:{}
                },
            }
            var obj = data.updates;
            obj.reportInfo.create_people = this.ctx.session.username;
            obj.reportInfo.application_id = data.id;
            const thedata = await this.Report.create(obj.reportInfo);
            var theObj={
                report_id:thedata.dataValues.report_id,
                card_ids:null,
                table_ids:null,
                trend_ids:null
            }
            await this.ReportBetween.create(theObj);
            var enumObj1={
                'card_ids':this.Card,
                'table_ids':this.Table,
                'trend_ids':this.Trend
            }
            var enumObj2={
                'card_ids':'card_id',
                'table_ids':'table_id',
                'trend_ids':'trend_id'
            }
            var obj=data.updates;
            for(let key  in obj){
                if(key!='reportInfo'){
                    var ids=await enumObj1[key].bulkCreate(obj[key],{updateOnDuplicate:[enumObj2[key]]});
                    if(ids.length>0){
                        var newIds=[];
                        for(var i=0;i<ids.length;i++){
                            newIds.push(ids[i][enumObj2[key]])
                        }
                        await this.ReportBetween.update({
                            [key]: newIds.join(','),
                        }, { where: { report_id: thedata.dataValues.report_id }, individualHooks: true });
                    }
                }
            }
            return this.ServerResponse.createBySuccessMsgAndData('创建成功', { code: 0 })
        }catch(e){
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async detail(report_id) {
        //api/application/detail   通过应用ID获取 应用的数据和指标的列表
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        try{
            var reportInfo = await this.Report.findOne({
                where: {
                    report_id: report_id
                }
            })
            if (!reportInfo) {
                return this.ServerResponse.requireData('报表不存在', { code: 1 });
            }
            var reportBetweenInfo = await this.ReportBetween.findOne({
                where: {
                    report_id: report_id
                },
                attributes:['card_ids','table_ids','trend_ids']
            })
            var enumObj1={
                'card_ids':'card_id',
                'table_ids':'table_id',
                'trend_ids':'trend_id'
            }
            var enumObj2={
                'card_ids':this.Card,
                'table_ids':this.Table,
                'trend_ids':this.Trend
            }
            var temp={};
            var obj=reportBetweenInfo.dataValues;
            for(let key  in obj){
                if(obj[key]){
                    var ids=obj[key].split(',').map(Number);
                    var dataArr=[];
                    for (var i = 0; i < ids.length; i++) {
                        var theObj={};
                        theObj[enumObj1[key]]=ids[i];
                        dataArr.push(theObj)
                    }
                    var objOption = {
                        [Op.or]: dataArr,
                    }
                    var dataList = await enumObj2[key].findAll({
                        where: objOption,
                    })
                    temp[key]=dataList
                }else{
                    temp[key]=[]
                }
            }
            temp['reportInfo']=reportInfo;
            return this.ServerResponse.createBySuccessMsgAndData('获取详情成功',temp)
        }catch(e){
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async list(obj) {
        var obj={
            application_keyword:'',
            application_label:'',
            application_dep_platform:'',
            report_keyword:''
        }
        var list = {
            count: 0,
            arr: [],
        }
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        var arr=[];
        if (obj.application_label) {
            arr.push({
                application_label: obj.application_label,
            })
        }
        if (obj.application_dep_platform) {
            arr.push({
                application_dep_platform: obj.application_dep_platform,
            })
        }
        var objOptionReport={
            [Op.or]: [{
                report_name: { [Op.like]: `%${obj.report_keyword}%` }
            }, {
                report_id: { [Op.like]: `%${obj.report_keyword}%` }
            }]
        }
        var objOptionApp = {
            [Op.or]: [{
                platform_app: { [Op.like]: `%${obj.application_keyword}%` }
            }, {
                platform_app_code: { [Op.like]: `%${obj.application_keyword}%` }
            }],
           [Op.and]: arr
        }
        var objOptionApp = {
            [Op.or]: [{
                platform_app: { [Op.like]: `%${obj.application_keyword}%` }
            }, {
                application_id: { [Op.like]: `%${obj.application_keyword}%` }
            }],
           [Op.and]: arr
        }
        await this.Report.findAndCountAll({
            where: objOptionReport,
            order: [
                ['create_time', 'DESC'] //降序desc，升序asc
            ],
            limit: 10,
            offset: 0,
            attributes: ['report_name','create_time'],
            include:[{
                model:this.Application,
                where: objOptionApp,
                attributes: ['application_id','platform_app_version','platform_app','application_dep_platform_label','application_label_label','platform_app_code','application_type_label']
            }],
            raw:true,
        }).then(function (result) {
            list.count = result.count,
            list.arr = result.rows
        })
        return this.ServerResponse.requireData('查询成功', list);
    }
    async delete(id) {
        const Op = this.app.Sequelize.Op;
        try{
            const result = await this.Report.findOne({
                where: { report_id: id },
            });
            if (!result) {
                return this.ServerResponse.requireData('报表不存在', { code: 1 });
            }
            var enumObj1={
                'card_ids':this.Card,
                'table_ids':this.Table,
                'trend_ids':this.Trend
            }
            var enumObj2={
                'card_ids':'card_id',
                'table_ids':'table_id',
                'trend_ids':'trend_id'
            }
            var reportBetween = await this.ReportBetween.findOne({
                where: {
                    report_id: id
                },
                attributes:['card_ids','table_ids','trend_ids']
            })
            var obj={card_ids:null,table_ids:null,trend_ids:null}
            for(let key  in obj){
                if(key!='reportInfo'){
                    var theObj={};
                    if(reportBetween.dataValues[key]){
                        var deleteIds=reportBetween.dataValues[key].split(',').map(Number);
                        theObj[enumObj2[key]]={[Op.in]:deleteIds};
                        await enumObj1[key].destroy({where:theObj})
                    }
                }
            }
            const temp = await this.ReportBetween.destroy({ where: { report_id: id } });
            const row = await this.Report.destroy({ where: { report_id: id } });
            if (row) {
                return this.ServerResponse.requireData('删除成功', { code: 0 });
            } else {
                return this.ServerResponse.requireData('删除失败', { code: 1 });
            } 
        }catch(e){
            return this.ServerResponse.networkError('网络问题');
        }
    }
    
}
module.exports = Report;
