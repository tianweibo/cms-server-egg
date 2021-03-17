'use strict';
const Service = require('egg').Service;

class BaseService extends Service {

  tableName() {
    return 'activity';
  }

  //统计条数
  async totalCount() {
    const result = await this.app.mysql.select(this.tableName());
    return result.length;
  }

  //获取列表数据
  async fetchAll(options = {}) {
    console.log('===this===', this);
    console.log('===BaseService===', BaseService);

    const result = await this.app.mysql.select(this.tableName(), options);

    console.log(result);
    return result;
  }

  //查询单条数据
  async findOne(where = {}) {
    const result = await this.app.mysql.get(this.tableName(), where);
    return result;
  }

  //创建方法
  async create(data = {}) {
    const result = await this.app.mysql.insert(this.tableName(), data);

    console.log(result);

    // 判断插入成功
    const res = result.affectedRows === 1;
    return res;
  }

  //更新方法
  async update(data = {}, where = {}) {
    const result = await this.app.mysql.update(this.tableName(), data, {
      where: where
    });
    // 判断更新成功
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }

  //更新方法
  async delete(where = {}) {
    const result = await this.app.mysql.delete(this.tableName(), where);

    console.log(result);

    // 判断删除成功
    const res = result.affectedRows === 1;
    return res;
  }

}

module.exports = BaseService;
