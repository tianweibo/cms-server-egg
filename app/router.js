'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);

  router.get('/api/sys-tag/list', controller.sysTag.list);
  router.get('/api/sys-tag/detail', controller.sysTag.detail);
  router.get('/api/sys-tag/create', controller.sysTag.create);
  router.get('/api/sys-tag/update', controller.sysTag.update);
  router.get('/api/sys-tag/delete', controller.sysTag.delete);

  router.get('/api/project/list', controller.project.list);
  router.get('/api/project/detail', controller.project.detail);
  router.get('/api/project/create', controller.project.create);
  router.get('/api/project/update', controller.project.update);
  router.get('/api/project/delete', controller.project.delete);

  router.get('/api/activity/list', controller.activity.list);
  router.get('/api/activity/detail', controller.activity.detail);
  router.get('/api/activity/create', controller.activity.create);
  router.get('/api/activity/update', controller.activity.update);
  router.get('/api/activity/delete', controller.activity.delete);

  router.get('/api/report/list', controller.report.list);
  router.get('/api/report/detail', controller.report.detail);
  router.get('/api/report/create', controller.report.create);
  router.get('/api/report/update', controller.report.update);
  router.get('/api/report/delete', controller.report.delete);

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
