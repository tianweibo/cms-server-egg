// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportApplication = require('../../../app/service/application');
import ExportAttribute = require('../../../app/service/attribute');
import ExportBasic = require('../../../app/service/basic');
import ExportEvent = require('../../../app/service/event');
import ExportIndicator = require('../../../app/service/indicator');
import ExportProject = require('../../../app/service/project');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    application: AutoInstanceType<typeof ExportApplication>;
    attribute: AutoInstanceType<typeof ExportAttribute>;
    basic: AutoInstanceType<typeof ExportBasic>;
    event: AutoInstanceType<typeof ExportEvent>;
    indicator: AutoInstanceType<typeof ExportIndicator>;
    project: AutoInstanceType<typeof ExportProject>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
