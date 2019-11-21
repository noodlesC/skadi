import { Form } from 'antd';
import React, { Component } from 'react';
import classNames from 'classnames';
import LoginContext from './LoginContext';
import LoginItem from './LoginItem';
import LoginSubmit from './LoginSubmit';

import styles from './index.less';

class Login extends Component {
  static Submit = LoginSubmit;

  static defaultProps = {
    className: '',
    onSubmit: () => {},
  };

  componentDidMount() {
    const { form, onCreate } = this.props;
    if (onCreate) {
      onCreate(form);
    }
  }

  getContext = () => {
    const { form } = this.props;
    return {
      form: { ...form },
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    if (form) {
      form.validateFields((err, values) => {
        if (onSubmit) {
          onSubmit(err, values);
        }
      });
    }
  };

  render() {
    const { className, children } = this.props;
    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form onSubmit={this.handleSubmit}>{children}</Form>
        </div>
      </LoginContext.Provider>
    );
  }
}

Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
});
export default Form.create()(Login);
