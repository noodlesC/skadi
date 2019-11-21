import React, { Component } from 'react';
import { connect } from 'dva';

import App from './components/app';
import styles from './style.less';

@connect(({ guide, loading }) => ({
  guide,
  loading: loading.models.guide,
}))
class Guide extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'guide/fetch',
    });
  }

  render() {
    const {
      guide: { appList = [] },
    } = this.props;
    return (
      <div className={styles.appList}>
        {appList.map((app, index) => (
          <App {...app} key={app.id} index={index + 1} />
        ))}
      </div>
    );
  }
}
export default Guide;
