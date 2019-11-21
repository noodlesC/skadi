import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import styles from './app.less';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1447148_85nzzqrgnpn.js',
});

const App = ({ name, index, icon = 'cgjh', value }) => (
  <a href={value} target="_blank" rel="noopener noreferrer">
    <div className={styles.container}>
      <div className={styles.context}>
        <div className={classNames(styles.wrap, styles[`wrap${(index % 12) + 1}`])}>
          <IconFont type={`icon-ipaas${icon}`} className={styles.icon} />
        </div>
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  </a>
);

export default App;
