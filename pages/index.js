import React, { Component } from 'react'
import Link from 'next/link'

import {
  connect
} from 'react-redux';

import {
  bindActionCreators
} from 'redux';

// import {
//   bindActionCreators
// } from 'redux-immutable';

import {
  withRouter
} from 'next/router';
import NProgress from 'nprogress';


import * as actionCreators from '../actions/About/index';

import Wrapper from '../styled/Index/index';

import {
  Flex,
  WhiteSpace,
  WingBlank,
  SearchBar,
  Menu,
  ActivityIndicator,
  NavBar,
  PullToRefresh,
  Drawer,
  List,
  Modal,
  NoticeBar,
  SwipeAction,
  Pagination,
  Button,
  InputItem,
  Icon,
  TabBar
} from 'antd-mobile';

import Head from '../components/head'
import Nav from '../components/nav'


import About from './Home/Home';
import SendActive from './Home/SendActive';
import Ucenter from './Home/Ucenter';

import styled, { createGlobalStyle } from 'styled-components';
import { relative, isAbsolute } from 'path';
import { relativeTimeRounding } from 'moment';

// const TooltipStyle = createGlobalStyle`
//   .ant-tooltip-inner {
//     color: #545A69;
//   }
// `


function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class Home extends Component {
  // static getInitialProps({ store, isServer, pathname, query }) {
  //   store.dispatch({ type: 'FOO', payload: 'foo' }); // component will be able to read from store's state when rendered
  //   return { custom: 'custom' }; // you can pass some custom props to component from here
  // }


  static async getInitialProps({ store, isServer, pathname, query, res, req }) {
    if (isServer == false) {
      NProgress.start();
    } else {



    }


    let data = store.getState();

    console.log(data.get("About").get("offset"), '*****');

    var offset = data.get("About").get("offset");
    var keyword = data.get("About").get("keyword");

    // console.log(data.Home.limit, 'data11');

    let params = {
      keyword: query.keyword ? query.keyword : keyword,
      offset: query.offset ? query.offset : offset,
      visible: false
    }

    await store.dispatch(actionCreators.getTables(params));

  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      minHeight: '300px',
      selectedTab: 'greenTab'
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this.props, '#######123####');

    if (document != undefined) {
      NProgress.done();
    }

    // let params = {
    //   limit: 10,
    //   offset: 1,
    //   visible: false
    // }

    // this.props.getTables(params)

  }

  onOpenChange(e) {

    let isOpen = !this.state.open;

    document.documentElement.clientHeight;

    this.setState({
      open: isOpen,
      minHeight: document.documentElement.clientHeight
    });
  }





  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>

        pageText



      </div>
    );
  }

  onWrapTouchStart(e) {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  render() {
    // const sidebar = (<List>
    //   {[0, 1, 2, 3, 4, 5, 3, 14, 15].map((i, index) => {
    //     if (index === 0) {
    //       return (<List.Item key={index}
    //         thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //         multipleLine
    //       >Category</List.Item>);
    //     }
    //     return (<List.Item key={index}
    //       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //     >Category{index}</List.Item>);
    //   })}
    // </List>);

    console.log(this.props, '########');

    // console.log(this.props.index.toJS(), '****####****###');

    const sidebar = (<List>
      <List.Item key={1}
        thumb="https://m.youyong.ba/static/images/icons/icon-72x72.png"
        multipleLine
      ><Link href="/">
          <a>主页</a>
        </Link></List.Item>
      <List.Item key={2}
        thumb="https://m.youyong.ba/static/images/icons/icon-72x72.png"
        multipleLine
      ><Link href="/list">
          <a>二级页</a>
        </Link></List.Item>

    </List>)

    NProgress.done();

    return (
      <Wrapper className="main">
        <Head title="游泳吧" />
        {/* <Nav /> */}

        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <Modal
            visible={this.state.visible}
            transparent
            maskClosable={false}
            onClose={this.onClose('modal1')}
            title="用户注册登录"
            footer={[{
              text: '登录', onPress: () => {

                this.setState({
                  visible: false
                });
              }
            }]}
            wrapProps={{ onTouchStart: this.onWrapTouchStart.bind(this) }}
            afterClose={() => { alert('afterClose'); }}
          >
            <div style={{ height: 150, overflow: 'scroll' }}>
              <InputItem
                placeholder="必填"
              >
                手机号
              </InputItem>
              <Button type="primary">发送验证码</Button>
              <InputItem
                placeholder="必填"
              >验证码</InputItem>
            </div>
          </Modal>
          <TabBar
            unselectedTintColor="white"
            tintColor="#e56045"
            barTintColor="#1b1b1b"
            hidden={this.state.hidden}
            tabBarPosition={"bottom"}
          >

            <TabBar.Item

              icon={{ uri: '/static/images/tarbarList.png' }}
              selectedIcon={{ uri: '/static/images/tarbarListSelect.png' }}
              title="主页"
              key="index"
              dot
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                });
              }}
            >
              <About router={this.props.router} />
            </TabBar.Item>

            <TabBar.Item
              icon={{ uri: '/static/images/tarbarPush.png' }}
              selectedIcon={{ uri: '/static/images/tarbarPushSelect.png' }}
              title="发布"
              key="send"
              selected={this.state.selectedTab === 'greenTab1'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab1',
                });
              }}
            >
              <SendActive />
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: '/static/images/tarbarloginIcon.png' }}
              selectedIcon={{ uri: '/static/images/tarbarloginIconSelect.png' }}
              title="个人中心"
              key="my"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                });
              }}
            >
              <Ucenter router={this.props.router} />
            </TabBar.Item>
          </TabBar>
        </div>
        <style jsx>{`
     .pagination-container {
      margin: 0 15px;
    }
    
    .custom-pagination-with-icon .am-pagination-wrap-btn-prev .am-button-inline{
      padding-left: 0;
      padding-right: 10px;
    }
    .custom-pagination-with-icon .am-pagination-wrap-btn-next .am-button-inline{
      padding-left: 10px;
      padding-right: 0;
    }
    .arrow-align {
      display: flex;
      align-items: center;
    }
    .sub-title {
      color: #888;
      font-size: 14px;
      padding: 30px 0 18px 0;
    }
    `}</style>
      </Wrapper>
    )
  }
}


//将state.counter绑定到props的counter
const mapStateToProps = (state) => {

  // console.log(state.get('About'), 'state');

  return {
    index: state.get('About')
  }

  // console.log(state, 'statestatestate');


  // return {
  //   index: state
  // }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  //全量
  return bindActionCreators(actionCreators, dispatch);
};
// Home = connect()(Home);
Home = connect(mapStateToProps, mapDispatchToProps)(Home);

// Home = withRedux(initializeStore)(Home);

export default withRouter(Home);

