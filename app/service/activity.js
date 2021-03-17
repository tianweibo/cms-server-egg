'use strict';
const Service = require('egg').Service;

const BaseService = require('./baseService');

class ActivityService extends BaseService {
  
  static tableName() {
    return 'activity';
  }

  async count() {
    const result = await super.totalCount();
    return result;
  }

  async list() {
    let options = {
      limit: 10, // 返回数据量
      offset: 0, // 数据偏移量
    };
    const result = await super.fetchAll(options);

    console.log(result);
    return result;
  }

  async find(id) {
    const result = await super.findOne({ id: id });
    return result;
  }

  async create(row) {
    const result = await super.insert({ ...row });

    // 判断插入成功
    const res = result.affectedRows === 1;
    return res;
  }

  async update(row, where) {
    const result = await super.update(row, {
      where: where
    });
    // 判断更新成功
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }

  async delete(id) {
    const result = await super.delete({ id: id });

    console.log(result);

    // 判断删除成功
    const res = result.affectedRows === 1;
    return res;
  }

}

module.exports = ActivityService;
