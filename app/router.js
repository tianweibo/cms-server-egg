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
  router.get('/article/create', controller.article.create);
  router.get('/article/read', controller.article.read);
  router.get('/article/update', controller.article.update);
  router.get('/article/delete', controller.article.delete);
};
