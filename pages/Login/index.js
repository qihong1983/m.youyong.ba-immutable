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

import NProgress from 'nprogress';

import {
    Flex,
    WhiteSpace,
    WingBlank,
    SearchBar,
    Menu,
    Button,
    ActivityIndicator,
    NavBar,
    ImagePicker,
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
import { Brief } from 'antd-mobile/lib/list/ListItem';


import Wrapper from '../../styled/Index/index';


const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}];

class Login extends Component {

    static async getInitialProps({ store, isServer, pathname, query, res, req }) {
        if (isServer == false) {
            NProgress.start();
        } else {

        }


    }

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            value: '',
            files: data,
            multiple: false,
            count: 60,
            checkVolid: true
        }


    }

    componentWillMount() {



    }

    componentDidMount() {
        console.log(this.props, 'this.props');

        // if (this.props.index.toJS().startPage) {
        // setTimeout(() => {
        //     //xxxxx

        //     // await this.props.setStartPage(false);
        //     this.props.router.replace("/");
        // }, 3000);
        // }
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
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


    /**
    * 点击二维码
    * @method checkVolidFn
    */
    async checkVolidFn(e) {
        var { count } = this.state;

        this.props.form.validateFields((err, values) => {
            console.log(err, 'err');
            console.log(values, 'values');

            if (err.phoneNumber) {

            } else {
                if (this.props.form.getFieldError('phoneNumber') == undefined) {
                    this.props.sendPassword(this.props.form.getFieldValue('phoneNumber'));
                }


                // this.props.form.validateFields((err, values) => {

                //     console.log(err, values, 'values');
                //     if (!err) {

                //     }
                // });

                //xxxxx
                const timer = setInterval(() => {
                    this.setState({ "count": (count--), checkVolid: false }, () => {
                        if (count === 0) {
                            clearInterval(timer);
                            this.setState({
                                checkVolid: true,
                                count: 60
                            })
                        }
                    });
                }, 1000);
            }
        });


    }


    loginFn() {
        this.props.form.validateFields((err, values) => {


            if (!err) {
                var params = {
                    phone: values.phoneNumber,
                    password: values.volidCode
                }

                this.props.getToken(params, this.props.router);
                // this.props.closeLoginModal();
            }
        });
    }

    render() {

        // {"userid":"17","avatar":null,"username":"1112","phone":"18600190151"}
        NProgress.done();
        console.log(this.props, 'this.props');
        const { getFieldProps, getFieldError } = this.props.form;

        const { files } = this.state;
        return (
            <Wrapper style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <NavBar mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.router.back();
                    }}>登录</NavBar>

                <List renderHeader={() => '输入手机获得验证码'}>

                    <InputItem
                        {...getFieldProps('phoneNumber', {
                            rules: [
                                { required: true, message: '请输入手机号' },
                                {
                                    pattern: new RegExp('[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$', 'g'),
                                    message: '手机号码有误'
                                }
                            ],
                        })}
                        type="text"
                        placeholder="必填"
                        error={getFieldError('phoneNumber')}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('phoneNumber').join('、'), 1);
                        }}
                        onChange={async (val) => {

                            await this.props.form.setFieldsValue({
                                phoneNumber: val
                            });

                        }}
                    >手机号</InputItem>

                    <List.Item>
                        <Button type="primary" onClick={() => {
                            if (this.state.checkVolid) {
                                this.checkVolidFn();
                            }

                        }} disabled={this.state.checkVolid ? false : true} >获取验证码({this.state.count})</Button>
                    </List.Item>


                </List>
                <WhiteSpace size="xl" />
                <List renderHeader={() => '输入得到的动态密码'}>
                    <InputItem
                        {...getFieldProps('volidCode', {
                            rules: [
                                { required: true, message: '动态密码必填' }
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
                        error={getFieldError('volidCode')}
                        disabledKeys={['.', '0', '3']}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('volidCode').join('、'), 1);
                        }}
                        onChange={async (val) => {

                            await this.props.form.setFieldsValue({
                                volidCode: val
                            });

                        }}
                    >动态密码</InputItem>

                    <List.Item>
                        <Button type="primary" onClick={this.loginFn.bind(this)}>登录</Button>
                    </List.Item>
                </List>


            </Wrapper >
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

Login = createForm()(Login);

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

// About = withRedux(initializeStore)(About);

export default withRouter(Login);