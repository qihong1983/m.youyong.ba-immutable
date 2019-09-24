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
  Menu,
  ActivityIndicator,
  NavBar,
  Drawer,
  List,
  NoticeBar,
  SwipeAction,
  Icon
} from 'antd-mobile';

import Head from '../components/head'
import Nav from '../components/nav'

class Home extends Component {
  // static getInitialProps({ store, isServer, pathname, query }) {
  //   store.dispatch({ type: 'FOO', payload: 'foo' }); // component will be able to read from store's state when rendered
  //   return { custom: 'custom' }; // you can pass some custom props to component from here
  // }


  static async getInitialProps({ store, isServer, pathname, query }) {
    if (isServer == false) {
      NProgress.start();
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
      minHeight: '300px'
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this.props, '#######123####');
    if (document != undefined) {
      NProgress.done();
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
            return (<SwipeAction
              style={{ backgroundColor: 'gray' }}
              autoClose
              right={[
                {
                  text: 'Cancel',
                  onPress: () => console.log('cancel'),
                  style: { backgroundColor: '#ddd', color: 'white' },
                },
                {
                  text: 'Delete',
                  onPress: () => console.log('delete'),
                  style: { backgroundColor: '#F4333C', color: 'white' },
                },
              ]}
              left={[
                {
                  text: 'Reply',
                  onPress: () => console.log('reply'),
                  style: { backgroundColor: '#108ee9', color: 'white' },
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('cancel'),
                  style: { backgroundColor: '#ddd', color: 'white' },
                },
              ]}
              onOpen={() => console.log('global open')}
              onClose={() => console.log('global close')}
            >
              <List.Item
                extra="More"
                arrow="horizontal"
                onClick={e => console.log(e)}
              >
                {v.cname}
              </List.Item>
            </SwipeAction>)
          })
        }

      </List>

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

    console.log(this.index);

    return (
      <div>
        <Head title="Home" />
        {/* <Nav /> */}

        <div className="hero">

          <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange.bind(this)}>主页</NavBar>


          <Drawer
            className="my-drawer"
            style={{ minHeight: this.state.minHeight }}
            enableDragHandle={false}
            contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
            sidebar={sidebar}
            open={this.state.open}
            onOpenChange={this.onOpenChange.bind(this)}
          >
            <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
              Notice: 完美前端脚手架(使前端开发不在复杂)--pwa + ssr + data fetching + react + redux + code splitting + antd + 多人并行开发方式 + SPA 。 简单、易用、实用性超过阿里（umi）、京东(taro)、百度(百度fis)。不服来战
          </NoticeBar>

            {this.getListItem()}


          </Drawer>

        </div>

        <style jsx>{`
      .hero {
        color:red;
      }
      .am-navbar {
        background-color: #e56045;
      }
    `}</style>
      </div>
    )
  }
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {

  console.log(state.get('About'), 'state');

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
