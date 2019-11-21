import { connect } from 'dva';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Form, message, Input, Row, Col, Table, Select } from 'antd';

@Form.create()
@connect(({ search }) => ({
  dataSource: search.dataSource,
  pagination: search.pagination,
}))
class Search extends Component {
  state = {
    spinning: false,
  };

  columns = [
    {
      width: 80,
      key: 'id',
      title: 'id',
      dataIndex: 'id',
    },
    {
      width: 100,
      key: 'name',
      title: 'name',
      dataIndex: 'name',
    },
    {
      width: 110,
      key: 'shopName',
      title: 'shopName',
      dataIndex: 'shopName',
    },
    {
      width: 100,
      key: 'shopId',
      title: 'shopId',
      dataIndex: 'shopId',
    },
    {
      width: 120,
      key: 'brandName',
      title: 'brandName',
      dataIndex: 'brandName',
    },
    {
      width: 180,
      key: 'categoryName',
      title: 'categoryName',
      dataIndex: 'categoryName',
    },
    {
      width: 180,
      key: 'backCategoryName',
      title: 'backCategoryName',
      dataIndex: 'backCategoryName',
    },
    {
      width: 100,
      key: 'tags',
      title: 'tags',
      dataIndex: 'tags',
    },
  ];

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err);
        return;
      }
      this.values = values;
      this.search(values, this.props.pagination);
    });
  };

  handleTableChange = pagination => {
    this.search(this.values, pagination);
  };

  search = (params, pagination) => {
    const { ids } = this.values;
    if (ids) {
      this.values.ids = [ids];
    }
    const { dispatch } = this.props;
    this.setState({ spinning: true });
    const { current, pageSize } = pagination;

    dispatch({
      type: 'search/fetch',
      payload: { params: { ...params, pageSize, page: current } },
    }).finally(() => {
      this.setState({ spinning: false });
    });
  };

  render() {
    const { spinning } = this.state;
    const {
      dataSource,
      pagination,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              <Row>
                <Col md={8} sm={24}>
                  <Form.Item label="搜索类型" hasFeedback>
                    {getFieldDecorator('scoreEnum', {
                      initialValue: 'STANDARD',
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Select placeholder="请输入" showSearch={false}>
                        <Option value="STANDARD">STANDARD</Option>
                        <Option value="SALE">SALE</Option>
                        <Option value="SUGGEST">SUGGEST</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>

                <Col md={8} sm={24}>
                  <Form.Item label="id" hasFeedback>
                    {getFieldDecorator('ids', {
                      rules: [{ required: false, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>

                <Col md={8} sm={24}>
                  <Form.Item label="shopId" hasFeedback>
                    {getFieldDecorator('shopId', {
                      rules: [{ required: false, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>

                <Col md={8} sm={24}>
                  <Form.Item label="随便搜" hasFeedback>
                    {getFieldDecorator('query', {
                      rules: [{ required: false, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>

                <Col md={8} sm={24}>
                  <Form.Item label="品牌" hasFeedback>
                    {getFieldDecorator('brandName', {
                      rules: [{ required: false, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>

                <Col md={8} sm={24}>
                  <Form.Item label="店铺名称" hasFeedback>
                    {getFieldDecorator('shopName', {
                      rules: [{ required: false, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>

                {/*<Col md={8} sm={24}>*/}
                {/*  <Form.Item label="每页条数" hasFeedback>*/}
                {/*    {getFieldDecorator('pageSize', {*/}
                {/*      rules: [{ required: false, message: '请输入' }],*/}
                {/*    })(<Input placeholder="请输入" />)}*/}
                {/*  </Form.Item>*/}
                {/*</Col>*/}
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
            loading={spinning}
            pagination={pagination}
            columns={this.columns}
            dataSource={dataSource}
            onChange={this.handleTableChange}
            rowKey={record => record.position}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Search);
