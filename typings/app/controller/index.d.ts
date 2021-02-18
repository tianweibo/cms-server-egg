// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActivity = require('../../../app/controller/activity');
import ExportArticle = require('../../../app/controller/article');
import ExportHome = require('../../../app/controller/home');
import ExportNews = require('../../../app/controller/news');

declare module 'egg' {
  interface IController {
    activity: ExportActivity;
    article: ExportArticle;
    home: ExportHome;
    news: ExportNews;
  }
}
