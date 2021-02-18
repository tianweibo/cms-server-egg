'use strict';
const Service = require('egg').Service;

class ArticleService extends Service {
  
  constructor () {
    this.tableName = 'article';
  }


  async list() {
    const results = await this.app.mysql.select(this.tableName);

    console.log(result);
    return result;
  }

  async create() {
    const result = await this.app.mysql.insert(this.tableName, { title: '测试标题' });

    console.log(result);

    // 判断插入成功
    const res = result.affectedRows === 1;
    return res;
  }

  async read(id) {
    const result = await this.app.mysql.get(this.tableName, { id: id });
    return result;
  }

  async update(id) {
    const result = await this.app.mysql.update(this.tableName, { id: id });

    console.log(result);

    // 判断更新成功
    const res = result.affectedRows === 1;
    return res;
  }

  async delete(id) {
    const result = await this.app.mysql.delete(this.tableName, { id: id });

    console.log(result);

    // 判断删除成功
    const res = result.affectedRows === 1;
    return res;
  }

}

module.exports = ArticleService;
