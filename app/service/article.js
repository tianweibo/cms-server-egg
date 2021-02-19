'use strict';
const Service = require('egg').Service;

class ArticleService extends Service {
  
  static tableName() {
    return 'article';
  }

  async count() {
    const result = await this.app.mysql.select(ArticleService.tableName());
    return result.length;
  }

  async list() {
    const result = await this.app.mysql.select(ArticleService.tableName(), {
      orders: [['created_at','desc'], ['id','desc']], // 排序方式
      limit: 10, // 返回数据量
      offset: 0, // 数据偏移量
    });

    console.log(result);
    return result;
  }

  async find(id) {
    const result = await this.app.mysql.get(ArticleService.tableName(), { id: id });
    return result;
  }

  async create(row) {
    const result = await this.app.mysql.insert(ArticleService.tableName(), { ...row });

    // 判断插入成功
    const res = result.affectedRows === 1;
    return res;
  }

  async update(row, where) {
    const result = await this.app.mysql.update(ArticleService.tableName(), row, {
      where: where
    });
    // 判断更新成功
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }

  async delete(id) {
    const result = await this.app.mysql.delete(ArticleService.tableName(), { id: id });

    console.log(result);

    // 判断删除成功
    const res = result.affectedRows === 1;
    return res;
  }

}

module.exports = ArticleService;
