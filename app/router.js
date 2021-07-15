
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
  router.post('/api/user/login',controller.user.login);//系统登录-done
  router.post('/api/photo/upload',controller.photo.upload);//头像上传
  router.post('/api/user/editPassword',controller.user.editPassword);//密码修改
  router.post('/api/user/create',controller.user.create);//创建用户
  router.get('/api/user/useful',controller.user.useful);//用户禁用与否
  router.get('/api/user/resetPassword',controller.user.resetPassword);//用户禁用与否
  router.post('/api/user/update',controller.user.update);//编辑用户
  router.get('/api/user/detail',controller.user.detail);//用户详情
  router.delete('/api/user/delete',controller.user.delete);//用户删除
  router.post('/api/user/list',controller.user.list);// 用户列表获取-done   new Auth(1).check
  router.get('/api/user/loginOut',controller.user.loginOut);// 用户退出-done
  router.get('/api/user/isLogin',controller.user.isLogin);// 是否登录
  //数据导入
  router.post("/api/event/importEvent", controller.event.importEvent);//批量导入事件-done
  //事件
  router.post('/api/event/list',controller.event.list);// 事件列表的获取-done
  router.post('/api/event/create',controller.event.create);//事件的创建-done
  router.get('/api/event/detail',controller.event.detail);//事件详情的查看-done
  router.get('/api/event/archive',controller.event.archive);//事件的归档-done
  router.delete('/api/event/delete',controller.event.delete);//事件的删除-done
  router.post('/api/event/update',controller.event.update);//事件的更新-done
  router.get('/api/event/indicByEventId',controller.event.indicByEventId);//事件下的指标
  //属性
  router.post('/api/attribute/list',controller.attribute.list);// 属性列表的获取
  router.post('/api/attribute/detail',controller.attribute.detail);//属性详情的查看
  router.post('/api/attribute/eventList',controller.attribute.eventList); //属性下的时间列表
  //应用
  router.post('/api/application/create',controller.application.create);//应用的创建
  router.post('/api/application/update',controller.application.update);//应用的编辑
  router.get('/api/application/detail',controller.application.detail);//应用详情的查看
  router.post('/api/application/detailByIndicator',controller.application.detailByIndicator);//应用详情的查看-指标
  router.post('/api/application/detailByEvent',controller.application.detailByEvent);//应用详情的查看-事件
  router.post('/api/application/list',controller.application.list);// 应用列表的获取
  router.get('/api/application/useful',controller.application.useful);//应用的启停与否
  router.delete('/api/application/delete',controller.application.delete);//应用的删除
  //指标
  router.post('/api/indicator/listById',controller.indicator.listById);// 通过ID获取指标的列表
  router.post('/api/indicator/listByType',controller.indicator.listByType);// 通过指标类型和一级指标获取指标的列表
  router.post('/api/indicator/list',controller.indicator.list);// 指标列表的获取
  router.post('/api/indicator/create',controller.indicator.create);//指标的创建
  router.get('/api/indicator/detail',controller.indicator.detail);//指标详情的查看
  router.get('/api/indicator/archive',controller.indicator.archive);//指标的归档
  router.delete('/api/indicator/delete',controller.indicator.delete);//指标的删除
  router.post('/api/indicator/update',controller.indicator.update);//指标的更新
  router.post("/api/indicator/importIndicator", controller.indicator.importIndicator);//批量导入指标
  
  //公共数据的获取
  router.get('/api/basic/data',controller.basic.data);
  //标签
  router.post('/api/label/list',controller.theLabel.list);// 标签的列表的获取
  router.post('/api/label/createParent',controller.theLabel.createParent);//标签的创建-父级
  router.post('/api/label/createSon',controller.theLabel.createSon);//标签的创建-子级
  router.delete('/api/label/delete',controller.theLabel.delete);//标签的删除
  router.post('/api/label/update',controller.theLabel.update);//标签的更新
  router.get('/api/label/labelType',controller.theLabel.labelType);//标签的类别获取
  router.post('/api/label/calcNumber',controller.theLabel.calcNumber);//标签的数量统计
};
