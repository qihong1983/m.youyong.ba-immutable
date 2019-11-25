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


function clearCookie(name) {
    setCookie(name, "", -1);
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies 
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}];

class Ucenter extends Component {

    static async getInitialProps({ store, isServer, pathname, query, res, req }) {

        // console.log('****************************************************');

        var token = "";
        if (isServer == false) {// node
            NProgress.start();

            token = getCookie('token');

        } else {// 浏览器

            // console.log(req.headers.cookie, '#####');

            console.log(req.headers);
            var arr = [];
            req.headers.cookie.split(";").forEach(item => {
                if (!item) {
                    return;
                }

                alert(1);
                console.log(item.split('=')[0].trim(), '#####^^^');

                // arr.push({
                //     `item.split('=')[0].trim()`: token = item.split('=')[1]
                // });


                if (item.split('=')[0].trim() == 'token') {
                    token = item.split('=')[1];
                }
            })
        }










    }

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            value: '',
            files: data,
            multiple: false,
            userId: "",
            userName: "",
            avatar: []
        }


    }

    componentWillMount() {



    }

    componentDidMount() {
        console.log(this.props, 'this.props');


        var userId = getCookie("userId");
        var userName = getCookie("userName");
        var avatar = getCookie("avatar");
        var phone = getCookie("phone");

        // this.setState({
        //     userId: userId,
        //     userName: userName,
        //     avatar: avatar
        // });

        this.props.form.setFieldsValue({
            userName: userName,
            avatar: avatar ? [{ "url": avatar }] : [],
        })

    }

    onChange = async (files, type, index) => {
        console.log(files, type, index);

        if (type == "add") {

            //https://api.youyong.ba/uploadimg

            console.log(files[0].file, 'files[0].filefiles[0].filefiles[0].file');

            var img = await this.props.uploadimg(files);

            console.log(img, 'imgimgimg');
            await this.props.form.setFieldsValue({
                avatar: [{ url: img }]
            });
        } else if (type == "remove") {
            this.props.form.setFieldsValue({
                avatar: []
            });
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

            console.log(error, values, '#######');

            if (!error) {
                if (values.avatar.length == 0) {
                    Toast.fail("头像必填");
                } else {
                    var data = {
                        avatar: values.avatar[0].url,
                        username: values.userName,
                        phone: getCookie("phone"),
                        userid: getCookie("userId"),
                    }

                    var token = getCookie("token");

                    this.props.saveUserInfo(data, token, this.props.router);
                }


            } else {
                console.log(111);

            }

        });
    }

    logout() {
        clearCookie("token");


        clearCookie('userId');
        clearCookie('userName');
        clearCookie('avatar');
        clearCookie('phone');

        Toast.success("已退出");
    }

    render() {

        // {"userid":"17","avatar":null,"username":"1112","phone":"18600190151"}

        console.log(this.props, 'this.props');
        const { getFieldProps, getFieldError } = this.props.form;

        const { files } = this.state;
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>

                <NavBar>个人中心</NavBar>

                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: 此应用暂时公公是线上作品，在调试和迭代的过程中很有可能删除数据库
          </NoticeBar>

                <List>
                    <InputItem
                        {...getFieldProps('userName', {
                            rules: [
                                { required: true, message: '输入用户名' }
                            ],
                        })}
                        type="text"
                        placeholder="必填"
                        error={getFieldError('userName')}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('userName').join('、'), 1);
                        }}
                        onChange={async (val) => {

                            await this.props.form.setFieldsValue({
                                userName: val
                            });

                        }}
                    >用户名</InputItem>

                    <List.Item>
                        用户头像
                        <List.Item.Brief>
                            <ImagePicker
                                {...getFieldProps('avatar', {
                                    rules: [
                                        { required: true, message: '图片必填' }
                                    ],
                                })}
                                files={getFieldProps('avatar').value}
                                onChange={this.onChange.bind(this)}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={getFieldProps('avatar').value ? getFieldProps('avatar').value.length < 1 : []}
                                multiple={false}
                            />

                        </List.Item.Brief>
                    </List.Item>
                    <List.Item>
                        <Button type="primary" onClick={() => {
                            this.handleSubmit();
                        }}>修改</Button>

                    </List.Item>
                    <List.Item>
                        <Button type="default" onClick={() => {
                            this.logout();
                        }}>退出</Button>

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

Ucenter = createForm()(Ucenter);
export default Ucenter = connect(mapStateToProps, mapDispatchToProps)(Ucenter);

// About = withRedux(initializeStore)(About);

// export default withRouter(About);