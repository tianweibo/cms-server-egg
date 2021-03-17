'use strict';

// app/extend/helper.js
const moment = require('moment');
exports.formatDate = time => moment(new Date(time * 1000)).fromNow();

exports.apiResponse = (data=[], code=0, msg='success') => ({ data, code, msg });
