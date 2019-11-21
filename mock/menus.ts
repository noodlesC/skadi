const app = {
  name: '一个应用',
  value: 'http://localhost:8000/list/table/list',
  extra: { icon: 'ipaaslabel' },
};
const arr = [];
for (let i = 0; i < 20; i++) {
  arr.push({
    ...app,
    id: i,
  });
}

export default {
  'GET /api/menus': [
    {
      name: '我的一个系统',
      value: '/list/table/list',
      icon: 'icon-ipaaslabel',
    },
    {
      name: '我的一个系统1',
      value: '/list/table/list1',
      icon: 'icon-ipaaslabel',
    },
    {
      name: '应用导航',
      value: '/guide',
      icon: 'icon-ipaaslabel',
    },
  ],
  'GET  /api/app': arr,
  'GET /resource/menusByApp': {
    success: true,
    code: '',
    msg: '',
    data: [
      {
        id: 1,
        createAt: '2019-10-21T14:07:21.188+0000',
        updateAt: '2019-10-21T14:07:21.188+0000',
        deleted: null,
        name: 'menu1',
        type: 'menu',
        value: '/list/table/list',
        pid: 1,
        extra: '{}',
        children: null,
      },
      {
        id: 1,
        createAt: '2019-10-21T14:07:21.188+0000',
        updateAt: '2019-10-21T14:07:21.188+0000',
        deleted: null,
        name: 'menu2',
        type: 'menu',
        value: '/list/table/list1',
        pid: 1,
        extra: '{}',
        children: null,
      },
    ],
  },
  'GET /resource/getBaseInfo': {
    success: true,
    code: '',
    msg: '',
    data: {
      menus: [
        {
          id: 162,
          pid: 161,
          name: '分词',
          type: 'menu',
          value: '/analyze',
          extra: '{}',
        },
        {
          id: 162,
          pid: 161,
          name: 'DSL',
          type: 'menu',
          value: '/dsl',
          extra: '{}',
        },
        {
          id: 162,
          pid: 161,
          name: '搜索',
          type: 'menu',
          value: '/search',
          extra: '{}',
        },
      ],
      urls: [
        {
          id: 166,
          pid: 162,
          name: 'api',
          type: 'api',
          value: '/list/table/list',
          extra: '{"method":"GET"}',
        },
        {
          id: 165,
          pid: 162,
          name: 'api',
          type: 'api',
          value: '/analyze',
          extra: '{"method":"GET"}',
        },
        {
          id: 164,
          pid: 162,
          name: 'api',
          type: 'api',
          value: '/dsl',
          extra: '{"method":"GET"}',
        },
        {
          id: 167,
          pid: 162,
          name: 'api2',
          type: 'api',
          value: '/api/a2',
          extra: '{"method":"GET"}',
        },
        {
          id: 168,
          pid: 164,
          name: 'api3',
          type: 'api',
          value: '/api/a3',
          extra: '{"method":"GET"}',
        },
      ],
      btns: [
        {
          id: 170,
          pid: 168,
          name: 'btn2',
          type: 'btn',
          value: '/btn/b2',
          extra: '{"code":"btn2"}',
        },
        {
          id: 169,
          pid: 168,
          name: 'btn1',
          type: 'btn',
          value: '/btn/b1',
          extra: '{"code":"btn1"}',
        },
      ],
    },
  },
};
