import React from 'react';
import serialize from 'serialize-javascript';
import '@/assets/common.less';
import './index.less';
import { Context } from 'midway';
import Common from './Common';

const commonNode = (props: LayoutProps) =>
  // 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ?  props.children  : ''
  props.children ?
    (
      <div className='normal'>
      <Common content={props.children} />
    </div>
    )
  : null;

interface LayoutProps {
  layoutData: Context;
  children?: JSX.Element | null;
}

const Layout: SFC<LayoutProps> = (props: LayoutProps): JSX.Element | null => {
  if (__isBrowser__) {
    return commonNode(props);
  } else {
    const { serverData } = props.layoutData;
    const { injectCss, injectScript } = props.layoutData.app.config;
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <meta name='theme-color' content='#000000' />
          <title>React SSR</title>
          {injectCss &&
            injectCss.map((item: string) => (
              <link rel='stylesheet' href={item} key={item} />
            ))}
        </head>
        <body>
          <div id='app'>{commonNode(props)}</div>
          {serverData && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(
                  serverData
                )}`, // tslint:disable-line
              }}
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: injectScript && injectScript.join(''),
            }}
          />
        </body>
      </html>
    );
  }
};

export default Layout;
