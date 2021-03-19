// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportActivity = require('../../../app/service/activity');
import ExportArticle = require('../../../app/service/article');
import ExportBaseService = require('../../../app/service/baseService');
import ExportChart = require('../../../app/service/chart');
import ExportProject = require('../../../app/service/project');

declare module 'egg' {
  interface IService {
    activity: AutoInstanceType<typeof ExportActivity>;
    article: AutoInstanceType<typeof ExportArticle>;
    baseService: AutoInstanceType<typeof ExportBaseService>;
    chart: AutoInstanceType<typeof ExportChart>;
    project: AutoInstanceType<typeof ExportProject>;
  }
}
