// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApplication = require('../../../app/controller/application');
import ExportAttribute = require('../../../app/controller/attribute');
import ExportBasic = require('../../../app/controller/basic');
import ExportEvent = require('../../../app/controller/event');
import ExportHome = require('../../../app/controller/home');
import ExportIndicator = require('../../../app/controller/indicator');
import ExportProject = require('../../../app/controller/project');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    application: ExportApplication;
    attribute: ExportAttribute;
    basic: ExportBasic;
    event: ExportEvent;
    home: ExportHome;
    indicator: ExportIndicator;
    project: ExportProject;
    user: ExportUser;
  }
}
