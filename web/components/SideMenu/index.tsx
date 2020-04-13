import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './index.less';

interface Props {}

const SideMenu: React.SFC<Props> = (props: Props) => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === currentPath) return;
    setCurrentPath(pathname);
  }, []);

  const navClick = (path: string) => {
    if (path === currentPath) return;
    setCurrentPath(path);
  };

  return (
    <div className='left-nav'>
      <ul id='nav'>
        <Link
          to={'/'}
          onClick={() => {
            navClick('/');
          }}
          className={currentPath === '/' ? 'on' : ''}
        >
          <span className='author'>Siyi</span>
          <br /> 保持热情，持续学习
        </Link>
        <Link
          to={'/about'}
          onClick={() => {
            navClick('/about');
          }}
          className={currentPath === '/about' ? 'on' : ''}
        >
          关于
        </Link>
      </ul>
    </div>
  );
};

export default SideMenu;
