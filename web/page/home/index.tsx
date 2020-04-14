import React from 'react';
import './index.less';

interface Props {
  articleList: any
}

const Home: SFC<Props> = (props: Props): JSX.Element => {
 const {articleList} = props;
 let html = '';
 console.log(333, articleList);
  for(let item of articleList) {
    console.log(222, item.html);
    html = item.html;
  }
  return (
    <div className='home-wrap'>
      Home
      <div dangerouslySetInnerHTML={{__html:html}}></div>
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  return __isBrowser__
    ? await ctx.apiService()
    : await ctx.apiService();
};
export default Home;
