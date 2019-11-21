import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Select, Button } from 'antd';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const { Option } = Select;
const GlobalHeaderRight = props => {
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  };
  return (
    <div className={styles.toolsContent}>
      <div className={styles.tools}>
        <Form {...formItemLayout}>
          <Row>
            <Col span={5}>
              <Form.Item label="数据中心" hasFeedback>
                {getFieldDecorator('selec1t', {
                  rules: [{ required: true, message: '请选择' }],
                })(
                  <Select placeholder="请选择">
                    <Option value="china">China</Option>
                    <Option value="usa">U.S.A</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="项目" hasFeedback>
                {getFieldDecorator('select', {
                  rules: [{ required: true, message: 'Please select your country!' }],
                })(
                  <Select placeholder="Please select a country">
                    <Option value="china">China</Option>
                    <Option value="usa">U.S.A</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="环境" hasFeedback>
                {getFieldDecorator('select', {
                  rules: [{ required: true, message: 'Please select your country!' }],
                })(
                  <Select placeholder="Please select a country">
                    <Option value="china">China</Option>
                    <Option value="usa">U.S.A</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="团队" hasFeedback>
                {getFieldDecorator('select', {
                  rules: [{ required: true, message: 'Please select your country!' }],
                })(
                  <Select placeholder="Please select a country">
                    <Option value="china">China</Option>
                    <Option value="usa">U.S.A</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={4} style={{ paddingTop: '3px' }}>
              <Button type="primary">切换</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.user}>
        <Avatar />
      </div>
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(Form.create()(GlobalHeaderRight));
