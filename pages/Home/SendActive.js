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


import moment from 'moment';


import {
    bindActionCreators
} from 'redux';


// import {
//     bindActionCreators
// } from 'redux-immutable';


import * as actionCreators from '../../actions/About/index';

//读取cookies 
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

class SendActive extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            value: '',
            imageUrl: "/static/default.png"
        }
    }

    componentWillMount() {



    }

    componentDidMount() {
        console.log(this.props, 'this.props');
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

            var nowDate = new Date().getTime();

            var sendDate = new Date(moment(values.endTime).format("YYYY-MM-DD hh:mm:ss")).getTime();


            var userId = getCookie("userId");
            var sendUser = getCookie("userName");
            var avatar = getCookie("avatar");


            console.log(this.state.imageUrl, 'imageUrl');

            console.log(moment(values.endTime).format("YYYY-MM-DD hh:mm:ss"), 'sdfasdfasdf');

            var data = {
                userId: userId,
                imageUrl: this.state.imageUrl,
                endTime: moment(values.endTime).format("YYYY-MM-DD hh:mm:ss"),
                price: values.price,
                title: values.title,
                userNum: values.num,
                sendUser: sendUser,
                thumb: avatar,
                py: pinyinUtil.getPinyin(values.title).replace(/\s/g, ""),
                isOver: 0
            }

            console.log(data, 'datadatadata');



            if (!error) {
                var token = getCookie('token');

                console.log(this.props, '@@@@@@@@');
                var isSuccess = await this.props.sendSwim(data, token, this.props.router);


                let params = {
                    offset: 1,
                    keyword: ""
                }
                this.props.getTables(params);
                this.props.form.resetFields();

            } else {
                Toast.fail("有错误");
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
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>

                <NavBar>结伴</NavBar>

                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: 此应用暂时公公是线上作品，在调试和迭代的过程中很有可能删除数据库
          </NoticeBar>

                <List>

                    <InputItem
                        {...getFieldProps('title', {
                            rules: [
                                { required: true, message: '输入结伴主题' }
                            ],
                        })}
                        type="text"
                        placeholder="必填"
                        error={getFieldError('title')}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('title').join('、'), 1);
                        }}
                        onChange={async (val) => {

                            await this.props.form.setFieldsValue({
                                title: val
                            });

                        }}
                    >结伴主题</InputItem>


                    <InputItem
                        {...getFieldProps('num', {
                            rules: [
                                { required: true, message: '人数限制必填' }
                            ],
                            normalize: (v, prev) => {
                                if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                    if (v === '.') {
                                        return '0.';
                                    }
                                    return prev;
                                }
                                return v;
                            },
                        })}
                        type="text"
                        placeholder="必填"
                        error={getFieldError('num')}
                        disabledKeys={['.', '0', '3']}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('num').join('、'), 1);
                        }}
                        onChange={async (val) => {

                            await this.props.form.setFieldsValue({
                                num: val
                            });

                        }}
                    >人数限制</InputItem>


                    <DatePicker
                        {...getFieldProps('endTime', {
                            // initialValue: this.state.dpValue,
                            rules: [
                                { required: true, message: '报名结束时间必填' },

                            ],
                        })}
                    >
                        <List.Item arrow="horizontal">报名截止时间</List.Item>
                    </DatePicker>


                    <InputItem
                        {...getFieldProps('price', {
                            rules: [
                                { required: true, message: '费用必填' },
                                {
                                    pattern: /^[0-9-]*$/,
                                    message: '请正确输入联系电话'
                                }
                            ],
                        })}
                        type={"money"}
                        placeholder="必填"
                        error={getFieldError('price')}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('price').join('、'), 1);
                        }}
                        disabledKeys={['.', '0', '3']}
                        clear

                        moneyKeyboardAlign="right"
                    >
                        费用
                    </InputItem>


                    <List.Item>
                        <Button type="primary" onClick={() => {
                            this.handleSubmit();
                        }}>发布</Button>
                    </List.Item>
                </List>

            </div>
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

SendActive = createForm()(SendActive);
export default SendActive = connect(mapStateToProps, mapDispatchToProps)(SendActive);

// About = withRedux(initializeStore)(About);

// export default withRouter(About);