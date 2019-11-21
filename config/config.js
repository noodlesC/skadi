import slash from 'slash2';
import webpackPlugin from './plugin.config';

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      pwa: false,
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  history: 'hash',
  targets: {
    ie: 11,
  },
  publicPath: '/skadi/',
  devtool: 'source-map',
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/guide',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          name: 'guide',
          path: '/guide',
          component: '../layouts/GuideLayout',
          routes: [
            {
              name: 'guide',
              path: '/guide',
              component: './guide',
            },
          ],
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // Routes: ['src/pages/Authorized'],
          routes: [
            {
              path: '/',
              redirect: '/guide',
            },
            {
              name: 'list',
              path: '/list/table/list',
              component: './list/table/list',
            },
            {
              name: 'analyze',
              path: '/analyze',
              component: './analyze',
            },
            {
              name: 'search',
              path: '/search',
              component: './search',
            },
            {
              name: 'dsl',
              path: '/dsl',
              component: './dsl',
            },
            {
              name: 'dslTree',
              path: '/dslTree',
              component: './dslTree',
            },
            {
              name: '403',
              path: '/exception/403',
              component: './exception/403',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,

  proxy: {
    '/purchaser/search/*': {
      // target: 'http://aggregated.dev-fulltime.cai-inc.com',
      // target: 'http://ipaas-test.cai-inc.com',
      target: 'http://127.0.0.1:8090',
      changeOrigin: true,
    },
    '/skadi/search/*': {
      // target: 'http://aggregated.dev-fulltime.cai-inc.com',
      // target: 'http://ipaas-test.cai-inc.com',
      target: 'http://127.0.0.1:8090',
      changeOrigin: true,
    },
  },
};
