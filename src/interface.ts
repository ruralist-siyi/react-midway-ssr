
export interface ArticleListResult {
  articleList: ArticleItem[]
}

interface ArticleItem {
  id: string,
  title: string,
  content: string,
  time: string
}

/**
 * @description Api-Service abstractions
 */
export interface ArticleService {
  queryList (): Promise<ArticleListResult>
}
