import React from 'react';
import SideMenu from '../components/SideMenu/index';

interface Props {
  content: JSX.Element | null | undefined
}

const CommonLayout: SFC<Props> = (props: Props): JSX.Element => {
  return (
    <div className='wrap-content'>
      <div className='left-menu'>
        <SideMenu />
      </div>
      <div className='content'>
        {props.content ? props.content : null}
      </div>
    </div>
  );
};

export default CommonLayout;
