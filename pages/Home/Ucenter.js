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

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}];

class Ucenter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            value: '',
            files: data,
            multiple: false,
        }


    }

    componentWillMount() {



    }

    componentDidMount() {
        console.log(this.props, 'this.props');
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

    render() {

        // {"userid":"17","avatar":null,"username":"1112","phone":"18600190151"}

        console.log(this.props, 'this.props');
        const { getFieldProps, getFieldError } = this.props.form;

        const { files } = this.state;
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>

                <NavBar>个人中心</NavBar>

                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: 完美前端脚手架(使前端开发不在复杂)--pwa + ssr + data fetching + react + redux + code splitting + antd + 多人并行开发方式 + SPA 。 简单、易用、实用性超过阿里（umi）、京东(taro)、百度(百度fis)。不服来战
          </NoticeBar>

                <List>

                    <InputItem
                        {...getFieldProps('username', {
                            rules: [
                                { required: true, message: '输入用户名' }
                            ],
                        })}
                        type="text"
                        placeholder="必填"
                        error={getFieldError('username')}
                        onErrorClick={() => {
                            Toast.fail(getFieldError('username').join('、'), 1);
                        }}
                        onChange={async (val) => {

                            await this.props.form.setFieldsValue({
                                username: val
                            });

                        }}
                    >用户名</InputItem>

                    <List.Item>
                        用户头像
                        <List.Item.Brief>
                            <ImagePicker
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 1}
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
                            this.handleSubmit();
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