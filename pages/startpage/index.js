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

class StartIndex extends Component {

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

        if (this.props.index.toJS().startPage) {
            setTimeout(async () => {
                //xxxxx

                await this.props.setStartPage(false);
                await this.props.router.replace("/");
            }, 3000);
        }
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
            <div style={{
                display: this.props.index.toJS().startPage ? "block" : "none",
                // display: "none",
                height: "100%", width: "100%", zIndex: 110, textAlign: "center", background: "white", position: "absolute", top: "0px"
            }}>
                <div>
                    {/* <img style={{ marginTop: "300px" }} src="/static/images/icons/icon-72x72.png" /> */}

                    <h2 style={{ marginTop: "150px", color: "#e56045" }}>互联网圈结伴游泳</h2>
                </div>
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

StartIndex = createForm()(StartIndex);

StartIndex = connect(mapStateToProps, mapDispatchToProps)(StartIndex);

// About = withRedux(initializeStore)(About);

export default withRouter(StartIndex);