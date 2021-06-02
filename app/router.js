
module.exports = app => {
  const { router, controller ,swagger} = app;
  const path = require('path');
  //const Auth = app.middleware.auth()
  // 加载所有的校验规则
  const directory = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(directory, 'validate');
  const { Auth} = require('./middleware/authClass')
  console.log(app.config.env,'app.config')
  //if(app.config.env==='dev'){
    app.beforeStart(async ()=>{     //定义模型
      await app.model.sync({alter:true});
    })  
  //} 
  router.get('/', controller.home.index);
  router.post('/api/user/login',controller.user.login);//系统登录-done
  router.post('/api/user/create',controller.user.create);//创建用户
  //router.post('/api/user/list',Auth,controller.user.list);// 用户列表获取
  router.post('/api/user/list',new Auth(1).check,controller.user.list);// 用户列表获取
  router.get('/api/user/loginOut',controller.user.loginOut);// 用户退出
  router.get('/api/user/isLogin',controller.user.isLogin);// 是否登录

  //事件
  //属性
  //指标
  //产品
  //公共数据的获取
};
