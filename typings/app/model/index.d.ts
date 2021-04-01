// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportProject = require('../../../app/model/project');
import ExportSysTag = require('../../../app/model/sysTag');

declare module 'egg' {
  interface IModel {
    Project: ReturnType<typeof ExportProject>;
    SysTag: ReturnType<typeof ExportSysTag>;
  }
}
