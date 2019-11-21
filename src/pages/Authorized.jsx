import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import Authorized from '@/components/Authorized';

const AuthComponent = ({
  children,
  currentUser,
  location = {
    pathname: '',
  },
  route = {
    routes: [],
  },
  urls,
}) => {
  const isLogin = currentUser && currentUser.userName;
  const { routes = [] } = route;
  const routesMap = {};
  routes.map(item => {
    if (item.path) routesMap[item.path] = true;
    return item;
  });
  return (
    <Authorized
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
      pathname={location.pathname}
      urls={urls}
      routes={routesMap}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }) => ({
  urls: user.urls,
  currentUser: user.currentUser,
}))(AuthComponent);
