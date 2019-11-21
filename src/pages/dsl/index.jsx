import { connect } from 'dva';
import { Button, Card, Col, Form, Input, message, Row, Table, Tree } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { TreeNode } = Tree;

const { TextArea } = Input;

const SQL = {
  from: 0,
  size: 2,
  timeout: '5000ms',
  query: {
    bool: {
      must: [
        {
          bool: {
            should: [
              {
                match: {
                  name: {
                    query: '苹果手机',
                    operator: 'OR',
                    prefix_length: 0,
                    max_expansions: 50,
                    fuzzy_transpositions: true,
                    lenient: false,
                    zero_terms_query: 'NONE',
                    auto_generate_synonyms_phrase_query: true,
                    boost: 1.0,
                  },
                },
              },
              { match_phrase: { name: { query: '苹果手机', slop: 5, boost: 1.0 } } },
            ],
            adjust_pure_negative: true,
            boost: 1.0,
          },
        },
      ],
      filter: [{ bool: { adjust_pure_negative: true, boost: 1.0 } }],
      adjust_pure_negative: true,
      boost: 1.0,
    },
  },
  explain: true,
  _source: {
    includes: [
      'saleQuantity',
      'backCategoryName',
      'supplierId',
      'shopName',
      'categoryName',
      'layer',
      'agreementId',
      'id',
      'shopId',
      'brandName',
      'instanceCode',
      'bidId',
      'tags',
      'backCategoryId',
      'name',
      'catalogsName',
      'attributes',
      'status',
    ],
    excludes: [],
  },
  sort: [{ _score: { order: 'desc' } }],
};

@Form.create()
@connect(({ dsl }) => ({
  length: dsl.length,
  total: dsl.total,
  purcharses: dsl.purcharses,
  entities: dsl.entities,
}))
class DSL extends Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
    spining: false,
  };
  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };
  renderTreeNodes = (data = []) => {
    return data.map(({ explanation }) => {
      return this.renderTreeNodesChild(explanation.details);
    });
  };

  renderTreeNodesChild = (data = []) => {
    console.log('@@', data);
    return data.map(item => {
      if (item) {
        return (
          <TreeNode title={item.description + item.value} key={item.description} dataRef={item}>
            {this.renderTreeNodesChild(item.details)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.value} {...item} />;
    });
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

  createColumns = () => {
    const { length } = this.props;
    const cols = [...this.columns];
    // for (let index = 0; index < length; index += 1) {
    //   const desc = `Description${index}`;
    //   const value = `Value${index}`;
    //   cols.push({ width: 280, key: desc, title: desc, dataIndex: desc });
    //   cols.push({ width: 180, key: value, title: value, dataIndex: value });
    // }
    return cols;
  };

  calculateWidth = cols => {
    let total = 0;
    cols.forEach(({ width }) => {
      if (width) {
        total += width;
      }
    });
    return total;
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err);
        return;
      }
      this.setState({ spining: true });
      const { dispatch } = this.props;
      dispatch({
        type: 'dsl/fetch',
        payload: values,
      }).finally(() => {
        this.setState({ spining: false });
      });
    });
  };

  render() {
    const { spining } = this.state;
    const {
      total,
      entities,
      purcharses,
      form: { getFieldDecorator },
    } = this.props;
    const colums = this.createColumns();
    const width = this.calculateWidth(colums);
    return (
      <PageHeaderWrapper>
        <Card style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '17px', margin: '4px' }}>
            搜检模型：相关度评分 + log(1 + scoreServiceProtocolQuantity)（服务协议数量） + log(1 +
            scoreSaleQuantity)(销量，只浙江省生效) +命中品牌*20 ）
          </div>
          <div style={{ fontSize: '17px', margin: '5px' }}>
            相关度评分: 商品名称、品牌名称、前台类目名称、后台类目名称+ 命中旗舰店区划和词条(+8分)
            +品牌认证经销商（+4分 浙江省生效) + 惩罚供应商沉底（-1000分）
          </div>
        </Card>

        <Card bordered={false} style={{ marginTop: '20px' }}>
          <div>
            <Form labelCol={{ span: 3 }} wrapperCol={{ span: 19 }}>
              <Row>
                <Col md={20} sm={24}>
                  <Form.Item label="DSL" hasFeedback>
                    {getFieldDecorator('dsl', {
                      rules: [{ required: true, message: '请输入' }],
                      initialValue: JSON.stringify(SQL),
                    })(<TextArea placeholder="请输入" autoSize={{ minRows: 5, maxRows: 8 }} />)}
                  </Form.Item>
                </Col>
                <Col md={4} sm={24} style={{ textAlign: 'right' }}>
                  <Button onClick={this.handleSubmit} type="primary" style={{ margin: '20px' }}>
                    查询
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>
        <Card style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '17px', margin: '5px' }}>查询总条数:{total}</div>
          <Table
            columns={colums}
            loading={spining}
            pagination={false}
            scroll={{ x: width }}
            dataSource={purcharses}
            rowKey={record => record.id}
          />
        </Card>
        <Card style={{ marginTop: '20px' }}>
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(entities)}
          </Tree>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(DSL);
