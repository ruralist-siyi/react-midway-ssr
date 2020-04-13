import { provide } from 'midway'
import { ArticleService, ArticleListResult } from '../interface'

@provide('ArticleOperateService')
export class ArticleOperateService implements ArticleService {

  queryList (): Promise<ArticleListResult> {
    return Promise.resolve({
      articleList: [
        {
          id: '1',
          title: 'Redux学习',
          content: 'Redux学习Redux学习Redux学习Redux学习Redux学习Redux学习Redux学习',
          time: '2020-01-01'
        }
      ]
    })
  }
}
