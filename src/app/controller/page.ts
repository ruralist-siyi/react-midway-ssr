import { controller, get, provide, inject, Context } from 'midway'
import { Config } from 'ykfe-utils'
import renderToStream from 'ykfe-utils/lib/renderToStream'
import { ArticleService } from '../../interface'

const ssrConfig: Config = require('../../../config/config.ssr')

@provide()
@controller('/')
export class Page {

  @inject()
  ctx: Context

  @inject('ArticleOperateService')
  service: ArticleService

  async index () {
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      this.ctx.type = 'text/html'
      this.ctx.status = 200
      this.ctx.apiService = this.service.queryList // 将service挂载到上下文对象
      const config = Object.assign(this.ctx.app.config, ssrConfig)
      const stream = await renderToStream(this.ctx, config)
      this.ctx.body = stream
    } catch (error) {
      this.ctx.logger.error(`Page Controller renderToStream Error`, error)
    }
  }

  @get('/queryArticleList')
  async queryList() {
    try {
      this.ctx.status = 200;
      this.ctx.body = await this.service.queryList();
    } catch (error) {
      this.ctx.logger.error(`Page Controller queryList Error`, error)
    }
  }

}
@provide()
@controller('/user')
export class User {

  @inject()
  ctx: Context

  @get('/')
  async index () {
    try {
      // Page为webpack打包的chunkName，项目默认的entry为Page
      this.ctx.type = 'text/html'
      this.ctx.status = 200
      this.ctx.body = 'hello user'
    } catch (error) {
      this.ctx.logger.error(`Page Controller renderToStream Error`, error)
    }
  }

}
