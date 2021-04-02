'use strict';

// app/extend/helper.js
const moment = require('moment');
const md5 = require('md5');

exports.formatDate = time => moment(new Date(time * 1000)).fromNow();

exports.apiResponse = (code=0, msg='success', data={}) => ({ code, msg, data });

exports.setPassword = (password) => md5(md5(password));
