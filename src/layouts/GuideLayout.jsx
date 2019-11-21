import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { connect } from 'dva';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.png';

// 自定义菜单
const menuDataRender = () => [];

const GuideLayout = props => {
  const { dispatch, children, menuData = [] } = props;
  /**
   * constructor
   */

  // useEffect(() => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'user/fetchCurrent',
  //     });
  //   }
  // }, []);
  /**
   * init variables
   */

  return (
    <ProLayout
      logo={logo}
      footerRender={false}
      menuDataRender={() => menuDataRender(menuData)}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      navTheme="light"
      layout="topmenu"
      contentWidth="Fixed"
      title="冰眼"
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global }) => ({
  collapsed: global.collapsed,
  menuData: global.menus,
}))(GuideLayout);
