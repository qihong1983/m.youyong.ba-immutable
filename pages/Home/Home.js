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

import {
    Flex,
    WhiteSpace,
    WingBlank,
    SearchBar,
    Modal,
    Menu,
    ActivityIndicator,
    NavBar,
    PullToRefresh,
    Drawer,
    List,
    NoticeBar,
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





class About extends Component {




    constructor(props) {
        super(props);
    }

    componentWillMount() {



    }

    componentDidMount() {
        console.log(this.props, 'this.props');
    }

    getListItem() {
        // console.log(this.props.index.toJS().table, '****************');
        // this.props.index.toJS().tableData.map((v, k) => {
        return (

            <List>
                {
                    // this.props.index.About.tableData.map((v, k) => {
                    this.props.index.toJS().tableData.map((v, k) => {
                        return (

                            <SwipeAction
                                style={{ backgroundColor: 'gray' }}
                                autoClose
                                right={[
                                    {
                                        text: '报名',
                                        onPress: () => {
                                            // console.log(this, '******');
                                            // this.props.router.push(`/baoming?id=1`);


                                        },
                                        style: { backgroundColor: '#e56045', color: 'white', width: '108px' },
                                    },
                                ]}

                                onOpen={() => console.log('global open')}
                                onClose={() => console.log('global close')}
                            >
                                <List.Item
                                    // extra="可点击可滑动"
                                    arrow="horizontal"
                                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                                    onClick={() => {
                                        this.props.router.push(`/baoming?id=2`);
                                    }}
                                >
                                    {v.cname} <List.Item.Brief>subtitle</List.Item.Brief>
                                </List.Item>
                            </SwipeAction>

                        )
                    })
                }

            </List>

        );
    }


    render() {
        console.log(this.props, 'this.props');
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>



                <div style={{ height: '100%' }}>
                    <NavBar>主页</NavBar>

                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        Notice: 完美前端脚手架(使前端开发不在复杂)--pwa + ssr + data fetching + react + redux + code splitting + antd + 多人并行开发方式 + SPA 。 简单、易用、实用性超过阿里（umi）、京东(taro)、百度(百度fis)。不服来战
          </NoticeBar>

                    <SearchBar placeholder="结伴游" showCancelButton maxLength={8} />

                    {this.getListItem()}

                    {/* <WhiteSpace /> */}
                    <Pagination total={5}
                        className="custom-pagination-with-icon"
                        current={1}
                        locale={{
                            prevText: (<span className="arrow-align"><Icon type="left" style={{ position: "relative", top: "5px" }} />上一步</span>),
                            nextText: (<span className="arrow-align">下一步<Icon type="right" style={{ position: "relative", top: "5px" }} /></span>),
                        }}
                    />
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
export default About = connect(mapStateToProps, mapDispatchToProps)(About);

// About = withRedux(initializeStore)(About);

// export default withRouter(About);