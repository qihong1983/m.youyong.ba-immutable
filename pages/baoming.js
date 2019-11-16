import React, {
    Component
} from 'react'


import {
    connect
} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import {
    withRouter
} from 'next/router';
import { createForm } from 'rc-form';

import {
    Flex,
    WhiteSpace,
    WingBlank,
    SearchBar,
    Menu,
    Button,
    ActivityIndicator,
    NavBar,
    DatePicker,
    Toast,
    PullToRefresh,
    Drawer,
    List,
    NoticeBar,
    InputItem,
    SwipeAction,
    Pagination,
    Icon,
    TabBar
} from 'antd-mobile';

import NProgress from 'nprogress';

import {
    bindActionCreators
} from 'redux';


// import {
//     bindActionCreators
// } from 'redux-immutable';


import * as actionCreators from '../actions/About/index';


import Wrapper from '../styled/Index/index';



class Baoming extends Component {

    static async getInitialProps({ store, isServer, pathname, query, res, req }) {
        if (isServer == false) {
            NProgress.start();
        } else {



        }


        // let data = store.getState();

        // console.log(data, '*****');
        // console.log(data.Home.limit, 'data11');



    }
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            value: '',
        }
    }

    componentWillMount() {



    }

    componentDidMount() {
        console.log(this.props, 'this.props');
        if (document != undefined) {
            NProgress.done();
        }
    }

    onErrorClick() {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }
    onChange(value) {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
        });
    }





    handleSubmit() {
        this.props.form.validateFields({ force: true }, async (error, values) => {

            if (!error) {
                console.log(222);
            } else {
                console.log(111);
            }

        });
    }

    render() {

        // userId: 17
        // endTime: 2019-11-15 12:01:04
        // price: 20
        // img: /static/default.png
        // isOver: 0
        // title: 主题
        // sendUser: 1111
        // startTime: 2019-11-15 12:01:04
        // num: 10
        // endNum: 10
        // thumb: https://api.youyong.ba/uploadimg/1113.png
        // pinyin: zhuti

        console.log(this.props, 'this.props');
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <Wrapper className="main" style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>

                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.router.back();
                    }}
                >
                    报名
                </NavBar>

                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: 完美前端脚手架(使前端开发不在复杂)--pwa + ssr + data fetching + react + redux + code splitting + antd + 多人并行开发方式 + SPA 。 简单、易用、实用性超过阿里（umi）、京东(taro)、百度(百度fis)。不服来战
          </NoticeBar>
                {/* 
                <List renderHeader={() => '费用'}>

                    <List.Item>
                        20￥
                    </List.Item>


                </List> */}

                <List renderHeader={() => '报名列表'}>


                    <List.Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">
                        小洪
                        </List.Item>

                    <List.Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">
                        小红
                        </List.Item>


                    <List.Item>
                        <Button type="primary" onClick={() => {
                            this.handleSubmit();
                        }}>报名</Button>
                    </List.Item>
                </List>

            </Wrapper>
        )
    }
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {

    console.log(state, 'state');

    return {
        index: state.get('About')
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //全量
    return bindActionCreators(actionCreators, dispatch);
};
// Home = connect()(Home);

Baoming = createForm()(Baoming);
Baoming = connect(mapStateToProps, mapDispatchToProps)(Baoming);

// About = withRedux(initializeStore)(About);

export default withRouter(Baoming);