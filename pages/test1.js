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
  Button,
  List,
  NoticeBar,
  SwipeAction,
  Icon
} from 'antd-mobile';

import Head from '../components/head'
import Nav from '../components/nav'

import styled, { createGlobalStyle, extend } from 'styled-components';



// const TooltipStyle = createGlobalStyle`
//   .ant-tooltip-inner {
//     color: #545A69;
//   }
// `
const test11 = styled.h1`
    color:yellow;
`;


// const test22 = test11.extend`
//     color:green;
// `;

const StyledDiv = styled(NavBar)`
  background: yellow;
`;
class Test1 extends Component {
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
    // // 扩展API加载完毕后调用onPlusReady回调函数 
    // document.addEventListener("plusready", onPlusReady, false);
    // // 扩展API加载完毕，现在可以正常调用扩展API 
    // function onPlusReady() {
    //   var cmr = plus.camera.getCamera();
    //   alert("Camera supperted video formats: " + cmr.supportedVideoFormats);
    // }

    var vConsole = new VConsole();
    this.webrtctest();

  }


  async webrtctest() {
    // var steam = await navigator.mediaDevices.getUserMedia({

    //   video: {
    //     width: 480,
    //     height: 320,
    //     facingMode: 'user',    //前置摄像头
    //     frameRate: {
    //       ideal: 30,
    //       min: 10
    //     }
    //   }, audio: false
    // });
    var that = this;

    /**
                * 成功回调函数
                * @param stream 视频流
                */
    async function success(stream) {
      var CompatibleURL = window.URL || window.webkitURL;
      // await setTimeout(async () => {

      console.log(that);
      try {

        that.video.srcObject = stream;
        // that.video.srcObject = CompatibleURL.createObjectURL(stream);
      } catch (e) {
        console.log(this);
        console.log(stream);
        that.video.srcObject = stream;
      }
      await that.video.play();



    }

    /**
     * 失败回调
     * @param error 错误对象
     */
    function error(error) {
      console.log('无法访问媒体设备', error);
    }
    // var constraints = {
    //   audio: true,
    //   video: {
    //     width: 480,
    //     height: 320,
    //     facingMode: "user",    //前置摄像头
    //     frameRate: {
    //       ideal: 30,
    //       min: 10
    //     }
    //   },
    // };

    // var constraints = {
    //   audio: true,
    //   video: true,
    //   video: { facingMode: { exact: "environment" } }
    // };

    var constraints = {
      audio: true,
      video: true
    };

    if (navigator.mediaDevices.getUserMedia) {
      //最新的标准API
      await navigator.mediaDevices
        .getUserMedia(constraints)
        .then(success)
        .catch(error);
    } else if (navigator.webkitGetUserMedia) {
      //webkit核心浏览器
      await navigator.webkitGetUserMedia(constraints, success, error);
    } else if (navigator.mozGetUserMedia) {
      //firfox浏览器
      await navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
      //旧版API
      await navigator.getUserMedia(constraints, success, error);
    }


    /**
     * 这个是可用的备份
     */
    // var steam = await navigator.mediaDevices.getUserMedia({
    //   video: {
    //     width: 480,
    //     height: 320,
    //     facingMode: "user"
    //   }, audio: false
    // });


    // console.log(steam);
    // this.video.srcObject = steam;
    // this.video.play();
    /**
     * 这个是可用备份结束 
     */

    // var steam = await navigator.getUserMedia({ video: true, audio: false });
    // console.log(steam, 'steam');

    // var steam = await navigator.webkitGetUserMedia({
    //   video: {
    //     width: 480,
    //     height: 320,
    //     facingMode: "user",    //前置摄像头
    //     frameRate: {
    //       ideal: 30,
    //       min: 10
    //     }
    //   }, audio: false
    // });




  }


  onOpenChange(e) {

    let isOpen = !this.state.open;

    document.documentElement.clientHeight;

    this.setState({
      open: isOpen,
      minHeight: document.documentElement.clientHeight
    });
  }


  onPlusFn() {
    var cmr = plus.camera.getCamera();
    alert("Camera supperted video formats: " + cmr.supportedVideoFormats);
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
        <input type="file" accept="image/*" capture="user" />
        <input type="file" accept="video/*" capture="camcorder" />
        <input type="file" accept="audio/*" capture="microphone" />

        <span>-----------</span>
        <input type="file" accept="image/*;capture=camera" />
        <input type="file" accept="image/*" capture />

        <span>-----------</span>
        <Button onClick={() => {
          dd.biz.util.uploadImageFromCamera({
            compression: true,//(是否压缩，默认为true)
            onSuccess: function (result) {
              alert(JSON.stringify(result));
              // _this.OA000103.push({ WeChatServerId: result[0] })
            },
            onFail: function (err) {
              alert('调用图片上传：' + JSON.stringify(err))
            }
          })
        }}>点击拍照</Button>
        {/* <div onClick={() => {
          this.onPlusFn();
        }}>点击调像机</div> */}
        {/* <Nav /> */}
        <video
          style={{ width: 400, height: 400 }}
          ref={v => {
            this.video = v;
          }}
          autoPlay playsInline loop
        >
          Video stream not available.
        </video>


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
Test1 = connect(mapStateToProps, mapDispatchToProps)(Test1);

// Home = withRedux(initializeStore)(Home);

export default withRouter(Test1);
