'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/news/list', controller.news.list);


  router.get('/sys-tag/list', controller.sysTag.list);
  router.get('/sys-tag/detail', controller.sysTag.detail);
  router.get('/sys-tag/create', controller.sysTag.create);
  router.get('/sys-tag/update', controller.sysTag.update);
  router.get('/sys-tag/delete', controller.sysTag.delete);

  router.get('/project/list', controller.project.list);
  router.get('/project/detail', controller.project.detail);
  router.get('/project/create', controller.project.create);
  router.get('/project/update', controller.project.update);
  router.get('/project/delete', controller.project.delete);

  router.get('/activity/list', controller.activity.list);
  router.get('/activity/detail', controller.activity.detail);
  router.get('/activity/create', controller.activity.create);
  router.get('/activity/update', controller.activity.update);
  router.get('/activity/delete', controller.activity.delete);

  router.get('/report/list', controller.report.list);
  router.get('/report/detail', controller.report.detail);
  router.get('/report/create', controller.report.create);
  router.get('/report/update', controller.report.update);
  router.get('/report/delete', controller.report.delete);

  router.get('/article/list', controller.article.list);
  router.get('/article/createView', controller.article.createView);
  router.get('/article/detail', controller.article.detail);
  router.get('/article/edit', controller.article.edit);

  router.post('/article/create', controller.article.create);
  router.post('/article/update', controller.article.update);
  router.get('/article/delete', controller.article.delete);

  router.get('/chart/chart', controller.chart.chart), 
  router.post('/chart/add', controller.chart.add)
  router.post('/chart/query', controller.chart.query)
};
