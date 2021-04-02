// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActivity = require('../../../app/controller/activity');
import ExportHome = require('../../../app/controller/home');
import ExportProject = require('../../../app/controller/project');
import ExportReport = require('../../../app/controller/report');
import ExportSysTag = require('../../../app/controller/sysTag');

declare module 'egg' {
  interface IController {
    activity: ExportActivity;
    home: ExportHome;
    project: ExportProject;
    report: ExportReport;
    sysTag: ExportSysTag;
  }
}
