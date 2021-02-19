/* eslint valid-jsdoc: "off" */

'use strict';

const clientInfo = {
  // host
  host: '180.97.69.171',
  // 端口号
  port: '3306',
  // 用户名
  user: 'prod',
  // 密码
  password: 'ENbrands+aKp+qy1b0_@1@',
  // 数据库名
  database: 'buried_points_server',
}

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'buried_points_server',
    },
    // client: clientInfo,
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612864597616_9798';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.api = {
    pageSize: 5,
    serverUrl: 'http://39.98.134.148:30002',
  };

  return {
    ...config,
    ...userConfig,
  };
};

