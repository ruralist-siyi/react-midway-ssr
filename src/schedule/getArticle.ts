import { provide, schedule } from 'midway';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
const low = require('lowdb');
const fs = require('fs');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json'); // 申明一个适配器
const db = low(adapter);

@provide()
@schedule({
  interval: 1000000000,
  type: 'worker',
  immediate: true
})
export class GetArticle {
  async exec(ctx?: any) {
    db.defaults({ articles: [] }).write();
    fs.readFile('data.json', 'utf-8', async function (err?: any, res?: any) {
      if (err) return;
      const data = JSON.parse(res).data;
      if (data) {
        if (Array.isArray(data)) {
          for (let item of data) {
            const res = await ctx.curl(item.url, { encoding: null });
            const $ = cheerio.load(iconv.decode(res.data, 'UTF-8'), {
              decodeEntities: false,
            });
            db.get('articles').push({
              html: $.html('table.d-block'),
              title: item.title,
              time: item.time
            }).write();
          }
        }
      }
    });
  }
}
