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

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

class Baoming extends Component {

    static async getInitialProps({ store, isServer, pathname, query, res, req }) {
        var token = "";
        if (isServer == false) {// node
            NProgress.start();

            token = getCookie('token');

        } else {// 浏览器

            // console.log(req.headers.cookie, '#####');

            console.log(req.headers);
            req.headers.cookie.split(";").forEach(item => {
                if (!item) {
                    return;
                }

                if (item.split('=')[0].trim() == 'token') {
                    token = item.split('=')[1];
                }
            })
        }


        // let data = store.getState();

        // console.log(data, '*****');
        // console.log(data.Home.limit, 'data11');

        console.log(query.id, token, '#################')

        await store.dispatch(actionCreators.getEntered(query.id, token));


        // await this.props.getEntered(query.id, token);






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

                var avatar = getCookie("avatar");
                var userId = getCookie("userId");
                var userName = getCookie("userName");
                var token = getCookie("token");

                var data = {
                    avatar: avatar,
                    userId: userId,
                    userName: userName,
                    classId: this.props.router.query.id
                }

                await this.props.okBaoming(data, token, this.props.router);

                await this.props.getEntered(this.props.router.query.id, token);
            } else {
                Toast.fail('出错了');
            }

        });
    }

    userListRender() {
        var arr = [];

        console.log(this.props.index.get("userList").toJS(), '******');

        var userList = this.props.index.get("userList").toJS();

        if (userList) {
            userList.map((v, k) => {

                arr.push(<List.Item thumb={v.avatar}>
                    {v.user}
                </List.Item>)

                // arr.push(<Col span={2} key={v.user}>
                //     <Tooltip title={v.user}>
                //         <Avatar size="large" src={v.avatar} alt={v.user} style={{ marginTop: "10px" }} />
                //     </Tooltip>
                // </Col>);
            });
        }

        return arr;
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
                    Notice: 此应用暂时公公是线上作品，在调试和迭代的过程中很有可能删除数据库
          </NoticeBar>
                {/* 
                <List renderHeader={() => '费用'}>

                    <List.Item>
                        20￥
                    </List.Item>


                </List> */}

                <List renderHeader={() => '报名列表'}>


                    {this.userListRender()}
                    {/* <List.Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">
                        小洪
                        </List.Item>

                    <List.Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">
                        小红
                        </List.Item> */}


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