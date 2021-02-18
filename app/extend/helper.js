'use strict';

// app/extend/helper.js
const moment = require('moment');
exports.formatDate = time => moment(new Date(time * 1000)).fromNow();
