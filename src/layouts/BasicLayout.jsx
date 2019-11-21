import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.png';

// 自定义菜单
const menuDataRender = menuData => {
  const a = menuData.map(menuItem => ({
    path: menuItem.value,
    name: menuItem.name,
    icon: menuItem.extra.icon ? menuItem.extra.icon : 'icon-ipaascgjh',
    isUrl: true,
  }));
  return a;
};

const BasicLayout = props => {
  const { dispatch, children, menuData = [] } = props;
  /**
   * constructor
   */

  // useEffect(() => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'user/fetchCurrent',
  //     });
  //     dispatch({
  //       type: 'user/fetchBaseInfo',
  //     });
  //   }
  // }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={false}
      menuDataRender={() => menuDataRender(menuData)}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      title="斯嘉蒂之眼"
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global, user }) => ({
  collapsed: global.collapsed,
  menuData: user.menus,
}))(BasicLayout);
