// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApplication = require('../../../app/model/application');
import ExportApplicationIndicator = require('../../../app/model/applicationIndicator');
import ExportAttribute = require('../../../app/model/attribute');
import ExportBasicData = require('../../../app/model/basicData');
import ExportEvent = require('../../../app/model/event');
import ExportEventAttribute = require('../../../app/model/eventAttribute');
import ExportIndicator = require('../../../app/model/indicator');
import ExportIndicatorEvent = require('../../../app/model/indicatorEvent');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Application: ReturnType<typeof ExportApplication>;
    ApplicationIndicator: ReturnType<typeof ExportApplicationIndicator>;
    Attribute: ReturnType<typeof ExportAttribute>;
    BasicData: ReturnType<typeof ExportBasicData>;
    Event: ReturnType<typeof ExportEvent>;
    EventAttribute: ReturnType<typeof ExportEventAttribute>;
    Indicator: ReturnType<typeof ExportIndicator>;
    IndicatorEvent: ReturnType<typeof ExportIndicatorEvent>;
    User: ReturnType<typeof ExportUser>;
  }
}
