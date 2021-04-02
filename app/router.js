'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/user/login', controller.user.login);
  router.post('/user/loginOut', controller.user.loginOut);
  router.get('/user/index', controller.user.index);
  router.get('/user/list', controller.user.list);
  router.get('/user/detail', controller.user.detail);
  router.post('/user/create', controller.user.create);
  router.post('/user/update', controller.user.update);
  router.post('/user/delete', controller.user.delete);

  router.get('/sys-tag/index', controller.sysTag.index);
  router.get('/sys-tag/list', controller.sysTag.list);
  router.get('/sys-tag/detail', controller.sysTag.detail);
  router.post('/sys-tag/create', controller.sysTag.create);
  router.post('/sys-tag/update', controller.sysTag.update);
  router.post('/sys-tag/delete', controller.sysTag.delete);

  router.get('/project/index', controller.project.index);
  router.get('/project/list', controller.project.list);
  router.get('/project/detail', controller.project.detail);
  router.post('/project/create', controller.project.create);
  router.post('/project/update', controller.project.update);
  router.post('/project/delete', controller.project.delete);

  router.get('/activity/index', controller.activity.index);
  router.get('/activity/list', controller.activity.list);
  router.get('/activity/detail', controller.activity.detail);
  router.get('/activity/create', controller.activity.create);
  router.get('/activity/update', controller.activity.update);
  router.get('/activity/delete', controller.activity.delete);

  router.get('/report/index', controller.report.index);
  router.get('/report/list', controller.report.list);
  router.get('/report/detail', controller.report.detail);
  router.get('/report/create', controller.report.create);
  router.get('/report/update', controller.report.update);
  router.get('/report/delete', controller.report.delete);

};
