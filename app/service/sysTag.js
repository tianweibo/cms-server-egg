'use strict';
const BaseService = require('./baseService');

class SysTagService extends BaseService {
  
  tableName() {
    return 'sys_tag';
  }

  async count() {
    const result = await super.totalCount();
    return result;
  }

  async list(options) {
    const result = await super.fetchAll(options);
    return result;
  }

  async findOne(where = {}) {
    const result = await super.findOne(where);
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
      tag_id: row.tag_id
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

module.exports = SysTagService;
