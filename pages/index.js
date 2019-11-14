import React, { Component } from 'react'
import Link from 'next/link'

import {
  connect
} from 'react-redux';

import {
  bindActionCreators
} from 'redux';

// import {
//   bindActionCreators
// } from 'redux-immutable';

import {
  withRouter
} from 'next/router';
import NProgress from 'nprogress';


import * as actionCreators from '../actions/About/index';
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
  NoticeBar,
  SwipeAction,
  Pagination,
  Icon,
  TabBar
} from 'antd-mobile';

import Head from '../components/head'
import Nav from '../components/nav'

import styled,{ createGlobalStyle } from 'styled-components';
import { relative, isAbsolute } from 'path';
import { relativeTimeRounding } from 'moment';

// const TooltipStyle = createGlobalStyle`
//   .ant-tooltip-inner {
//     color: #545A69;
//   }
// `




class Home extends Component {
  // static getInitialProps({ store, isServer, pathname, query }) {
  //   store.dispatch({ type: 'FOO', payload: 'foo' }); // component will be able to read from store's state when rendered
  //   return { custom: 'custom' }; // you can pass some custom props to component from here
  // }


  static async getInitialProps({ store, isServer, pathname, query, res, req }) {
    if (isServer == false) {
      NProgress.start();
    } else {
      var u = req.headers['user-agent'];
      console.log(u,'uuuuuuu');
      var isiOS = !!u.match(/iPhone/); //ios终端
    
      if (isiOS) {
        
      } else {
        await store.dispatch(actionCreators.setStartPage(false));
      }


    }



    // let data = store.getState();

    // console.log(data, '*****');
    // console.log(data.Home.limit, 'data11');

    let params = {
      limit: 10,
      offset: 1
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

    if (this.props.index.toJS().startPage) {
      setTimeout(() => {
        //xxxxx

        this.props.setStartPage(false);
      }, 3000);
    }
  }

  onOpenChange(e) {

    let isOpen = !this.state.open;

    document.documentElement.clientHeight;

    this.setState({
      open: isOpen,
      minHeight: document.documentElement.clientHeight
    });
  }


  getListItem() {
    // console.log(this.props.index.toJS().table, '****************');
    // this.props.index.toJS().tableData.map((v, k) => {
    return (

      <List>
        {
          // this.props.index.About.tableData.map((v, k) => {
          this.props.index.toJS().tableData.map((v, k) => {
            return (
              
            <SwipeAction
              style={{ backgroundColor: 'gray' }}
              autoClose
              right={[
                {
                  text: '报名',
                  onPress: () => console.log('报名'),
                  style: { backgroundColor: '#e56045', color: 'white', width:'108px' },
                },
              ]}
             
              onOpen={() => console.log('global open')}
              onClose={() => console.log('global close')}
            >
              <List.Item
                // extra="可点击可滑动"
                arrow="horizontal"
                thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                onClick={e => console.log(e)}
              >
                {v.cname} <List.Item.Brief>subtitle</List.Item.Brief>
              </List.Item>
            </SwipeAction>
 
            )
          })
        }

      </List>

    );
  }


  renderContent(pageText) {
    return (
      <div style={{  backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        
       
         <div style={{ height: '100%' }}>
         <NavBar>主页</NavBar>
       
        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
              Notice: 完美前端脚手架(使前端开发不在复杂)--pwa + ssr + data fetching + react + redux + code splitting + antd + 多人并行开发方式 + SPA 。 简单、易用、实用性超过阿里（umi）、京东(taro)、百度(百度fis)。不服来战
          </NoticeBar>

        <SearchBar placeholder="结伴游"  showCancelButton maxLength={8} />

          {this.getListItem()}
          
          {/* <WhiteSpace /> */}
          <Pagination total={5}
      className="custom-pagination-with-icon"
      current={1}
      locale={{
        prevText: (<span className="arrow-align"><Icon type="left" style={{position:"relative",top:"5px"}} />上一步</span>),
        nextText: (<span className="arrow-align">下一步<Icon type="right" style={{position:"relative",top:"5px"}} /></span>),
      }}
    /> 
           </div>
     
      </div>
    );
  }

  render() {
    // const sidebar = (<List>
    //   {[0, 1, 2, 3, 4, 5, 3, 14, 15].map((i, index) => {
    //     if (index === 0) {
    //       return (<List.Item key={index}
    //         thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //         multipleLine
    //       >Category</List.Item>);
    //     }
    //     return (<List.Item key={index}
    //       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
    //     >Category{index}</List.Item>);
    //   })}
    // </List>);

    
    // console.log(this.props.index.toJS(), '****####****###');

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

    

    return (
      <div>
        <Head title="Home" />
        {/* <Nav /> */}
        <div style={{
            // display:this.props.index.toJS().startPage ? "block": "none",
            display:"none",
            height:"100%", width:"100%", zIndex:110, textAlign:"center", background:"white", position:"absolute",top:"0px"}}>
            <div>
                <img style={{marginTop:"300px"}} src="/static/images/icons/icon-72x72.png" />
            </div>
        </div>
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition={"bottom"}
        >

          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
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
              {this.renderContent('Friend')}
          </TabBar.Item>

          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="发布"
            key="send"
            dot
            selected={this.state.selectedTab === 'greenTab1'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab1',
              });
            }}
          >
              {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="个人中心"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
      </div>
      <style jsx>{`
     .pagination-container {
      margin: 0 15px;
    }
    
    .custom-pagination-with-icon .am-pagination-wrap-btn-prev .am-button-inline{
      padding-left: 0;
      padding-right: 10px;
    }
    .custom-pagination-with-icon .am-pagination-wrap-btn-next .am-button-inline{
      padding-left: 10px;
      padding-right: 0;
    }
    .arrow-align {
      display: flex;
      align-items: center;
    }
    .sub-title {
      color: #888;
      font-size: 14px;
      padding: 30px 0 18px 0;
    }
    `}</style>
      </div>
    )
  }
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {

  // console.log(state.get('About'), 'state');

  return {
    index: state.get('About')
  }

  // console.log(state, 'statestatestate');


  // return {
  //   index: state
  // }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
  //全量
  return bindActionCreators(actionCreators, dispatch);
};
// Home = connect()(Home);
Home = connect(mapStateToProps, mapDispatchToProps)(Home);

// Home = withRedux(initializeStore)(Home);

export default withRouter(Home);
