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



import {
    bindActionCreators
} from 'redux';


// import {
//     bindActionCreators
// } from 'redux-immutable';


import * as actionCreators from '../../actions/About/index';

class SendActive extends Component {

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
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>

                <NavBar>结伴游泳健身</NavBar>

                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: 完美前端脚手架(使前端开发不在复杂)--pwa + ssr + data fetching + react + redux + code splitting + antd + 多人并行开发方式 + SPA 。 简单、易用、实用性超过阿里（umi）、京东(taro)、百度(百度fis)。不服来战
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