import { connect } from 'dva';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Form, message, Input, Row, Col, Table, Select } from 'antd';

const { Option } = Select;

@Form.create()
@connect(({ analyze, loading }) => ({
  tokens: analyze.tokens,
  loading: loading.models.analyze,
}))
class Analyze extends Component {
  state = {
    spining: false,
  };

  columns = [
    {
      key: 'token',
      title: 'token',
      dataIndex: 'token',
    },
    {
      key: 'type',
      title: 'type',
      dataIndex: 'type',
    },
    {
      key: 'position',
      title: 'position',
      dataIndex: 'position',
    },
    {
      key: 'start_offset',
      title: 'start_offset',
      dataIndex: 'start_offset',
    },
    {
      key: 'end_offset',
      title: 'end_offset',
      dataIndex: 'end_offset',
    },
  ];

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err);
        return;
      }
      this.setState({ spining: true });
      const { dispatch } = this.props;
      dispatch({
        type: 'analyze/fetch',
        payload: values,
      }).finally(() => {
        this.setState({ spining: false });
      });
    });
  };

  render() {
    const { spining } = this.state;
    const {
      tokens,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              <Row>
                <Col md={8} sm={24}>
                  <Form.Item label="环境" hasFeedback>
                    {getFieldDecorator('url', {
                      rules: [{ required: false, message: '请输入' }],
                    })(
                      <Select placeholder="请选择" showSearch={false}>
                        <Option value="dev">dev</Option>
                        <Option value="staging">staging</Option>
                        <Option value="test">test</Option>
                        <Option value="prod">prod</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="类型" hasFeedback>
                    {getFieldDecorator('analyzer', {
                      initialValue: 'ik_smart',
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Select placeholder="请输入" showSearch={false}>
                        <Option value="ik_smart">ik_smart</Option>
                        <Option value="ik_max_word">ik_max_word</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col md={8} sm={24}>
                  <Form.Item label="关键字" hasFeedback>
                    {getFieldDecorator('text', {
                      rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ textAlign: 'right' }}>
                <Button onClick={this.handleSubmit} type="primary" style={{ margin: '20px' }}>
                  查询
                </Button>
              </Row>
            </Form>
          </div>
        </Card>
        <Card>
          <Table
            pagination={false}
            loading={spining}
            dataSource={tokens}
            columns={this.columns}
            rowKey={record => record.position}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Analyze);
