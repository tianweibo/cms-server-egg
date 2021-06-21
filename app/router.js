
module.exports = app => {
  const { router, controller} = app;
  const path = require('path');
  //const Auth = app.middleware.auth()
  // 加载所有的校验规则
  const directory = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(directory, 'validate');
  const { Auth} = require('./middleware/authClass')
  //if(app.config.env==='dev'){
    app.beforeStart(async ()=>{     //定义模型
      await app.model.sync({alter:true});
    })  
  //} 
  router.get('/', controller.home.index);
  router.post('/user/login',controller.user.login);//系统登录-done
  router.post('/user/create',controller.user.create);//创建用户
  //router.post('/user/list',Auth,controller.user.list);// 用户列表获取
  router.post('/user/list',new Auth(1).check,controller.user.list);// 用户列表获取-done
  router.get('/user/loginOut',controller.user.loginOut);// 用户退出-done
  router.get('/user/isLogin',controller.user.isLogin);// 是否登录
  //数据导入
  router.post("/event/importEvent", controller.event.importEvent);//批量导入事件-done
  //事件
  router.post('/event/list',controller.event.list);// 事件列表的获取-done
  router.post('/event/create',controller.event.create);//事件的创建-done
  router.get('/event/detail',controller.event.detail);//事件详情的查看-done
  router.get('/event/archive',controller.event.archive);//事件的归档-done
  router.delete('/event/delete',controller.event.delete);//事件的删除-done
  router.post('/event/update',controller.event.update);//事件的更新-done
  //属性
  router.post('/attribute/list',controller.attribute.list);// 属性列表的获取
  router.post('/attribute/detail',controller.attribute.detail);//属性详情的查看
  router.post('/attribute/eventList',controller.attribute.eventList); //属性下的时间列表
  //应用
  router.post('/application/create',controller.application.create);//应用的创建
  router.post('/application/update',controller.application.update);//应用的编辑
  router.get('/application/detail',controller.application.detail);//应用详情的查看
  router.post('/application/detailByIndicator',controller.application.detailByIndicator);//应用详情的查看-指标
  router.post('/application/detailByEvent',controller.application.detailByEvent);//应用详情的查看-事件
  router.post('/application/list',controller.application.list);// 应用列表的获取
  router.get('/application/useful',controller.application.useful);//应用的启停与否
  router.delete('/application/delete',controller.application.delete);//应用的删除
  //指标
  router.post('/indicator/listById',controller.indicator.listById);// 通过ID获取指标的列表
  router.post('/indicator/list',controller.indicator.list);// 指标列表的获取
  router.post('/indicator/create',controller.indicator.create);//指标的创建
  router.get('/indicator/detail',controller.indicator.detail);//指标详情的查看
  router.get('/indicator/archive',controller.indicator.archive);//指标的归档
  router.delete('/indicator/delete',controller.indicator.delete);//指标的删除
  router.post('/indicator/update',controller.indicator.update);//指标的更新
  router.post("/indicator/importIndicator", controller.indicator.importIndicator);//批量导入指标
  
  //公共数据的获取
  router.get('/basic/data',controller.basic.data);
};
