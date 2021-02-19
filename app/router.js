'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/activity/list', controller.activity.list);
  router.get('/activity/detail', controller.activity.detail);

  router.get('/article/list', controller.article.list);
  router.get('/article/createView', controller.article.createView);
  router.get('/article/detail', controller.article.detail);
  router.get('/article/edit', controller.article.edit);

  router.post('/article/create', controller.article.create);
  router.post('/article/update', controller.article.update);
  router.get('/article/delete', controller.article.delete);
};
