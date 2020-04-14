import { provide } from 'midway';
import { ArticleService, ArticleListResult } from '../interface';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json'); // 申明一个适配器
const db = low(adapter);
@provide('ArticleOperateService')
export class ArticleOperateService implements ArticleService {
  queryList(): Promise<ArticleListResult> {
    return Promise.resolve({
      articleList: db.get('articles'),
    });
  }
}
