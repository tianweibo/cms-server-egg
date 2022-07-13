module.exports = app => {
  const { router, controller} = app;
  const path = require('path');
  //const Auth = app.middleware.auth()
  // 加载所有的校验规则
  const directory = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(directory, 'validate');
  const { Auth} = require('./middleware/authClass')
  if(app.config.env==='dev'){  
   /*  app.beforeStart(async ()=>{     //定义模型
      await app.model.sync({alter:true});
    }) */ 
  } 
  router.get('/', controller.home.index);
  router.post('/user/login',controller.user.login);//系统登录-done
  router.post('/photo/upload',controller.photo.upload);//头像上传
  router.post('/user/editPassword',new Auth(1).check,controller.user.editPassword);//密码修改
  router.post('/user/create',new Auth(10).check,controller.user.create);//创建用户
  router.get('/user/useful',new Auth(10).check,controller.user.useful);//用户禁用与否
  router.get('/user/resetPassword',new Auth(10).check,controller.user.resetPassword);//用户禁用与否
  router.post('/user/update',new Auth(10).check,controller.user.update);//编辑用户
  router.get('/user/detail',new Auth(10).check,controller.user.detail);//用户详情
  router.delete('/user/delete',new Auth(10).check,controller.user.delete);//用户删除
  router.post('/user/list',new Auth(10).check,controller.user.list);// 用户列表获取-done   new Auth(1).check
  router.get('/user/loginOut',controller.user.loginOut);// 用户退出-done
  router.get('/user/isLogin',controller.user.isLogin);// 是否登录
};
