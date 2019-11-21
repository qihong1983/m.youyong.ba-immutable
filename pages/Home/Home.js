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


const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (
    <svg
        className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
        {...restProps}
    >
        <use xlinkHref={type} /> {/ * svg - sprite - loader@0.3.x * /}
        {/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@latest */}
    </svg >
);



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
                                    thumb={v.thumb}
                                    onClick={() => {
                                        this.props.router.push(`/baoming?id=2`);
                                    }}
                                >
                                    {v.title} <List.Item.Brief>报名截止时间：{v.startTime}；<br />报名人数上限：{v.num}人；<br /> 费用：¥{v.price}；<br />发起人：{v.sendUser}；</List.Item.Brief>
                                </List.Item>
                            </SwipeAction>

                        )
                    })
                }

            </List>

        );
    }

    setPage(val) {
        var offset = this.props.index.get("offset");
        var keyword = this.props.index.get("keyword");

        if (val == "next") {
            // let params = {
            //     keyword: keyword,
            //     offset: offset + 1,
            //     visible: false
            // }


            this.props.router.push(`/?offset=${parseInt(offset, 10) + 1}&keyword=${keyword}`);
            // this.props.getTables(params);
        } else {
            // let params = {
            //     keyword: keyword,
            //     offset: offset - 1,
            //     visible: false
            // }

            this.props.router.push(`/?offset=${parseInt(offset, 10) - 1}&keyword=${keyword}`);
            // this.props.getTables(params);
        }


    }

    changeSearch(val) {
        this.props.router.push(`/?offset=${1}&keyword=${val}`);

    }

    render() {

        var total = this.props.index.get("total");

        var tempTotal = Math.floor(total / 8);

        total = total % 8 == 0 ? tempTotal : tempTotal + 1;

        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                {/* <CustomIcon type={require('/static/reload.svg')} /> */}
                <div style={{ height: '100%' }}>
                    <NavBar rightContent={[
                        <img src="/static/reloadm.png" style={{ width: "18px" }} onClick={() => {
                            // console.log(this.props.router);
                            // this.props.router.reload();

                            this.props.router.push(`/?offset=${this.props.router.query.offset ? this.props.router.query.offset : this.props.index.get("offset")}&keyword=${this.props.router.query.keyword ? this.props.router.query.keyword : this.props.index.get("keyword")}`);
                        }} />,
                    ]}>主页</NavBar>

                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        Notice: 此应用暂时公公是线上作品，在调试和迭代的过程中很有可能删除数据库
          </NoticeBar>

                    <SearchBar placeholder="结伴游" showCancelButton maxLength={8} onChange={this.changeSearch.bind(this)} />

                    {this.getListItem()}

                    {/* <WhiteSpace /> */}
                    <Pagination total={total}
                        className="custom-pagination-with-icon"
                        current={this.props.router.offset ? this.props.router.offset : this.props.index.get("offset")}
                        locale={{
                            prevText: (
                                <span className="arrow-align" onClick={() => {

                                    var offset = this.props.index.get("offset");

                                    if (offset > 1) {
                                        // this.setPrev();
                                        this.setPage('prev');
                                    }
                                }} >
                                    <Icon type="left" style={{ position: "relative", top: "5px" }} />
                                    上一步
                                </span>),
                            nextText: (
                                <span className="arrow-align" onClick={() => {
                                    var offset = this.props.index.get("offset");

                                    if (offset < total) {
                                        this.setPage('next');
                                    }
                                }}>
                                    下一步
                                    <Icon type="right" style={{ position: "relative", top: "5px" }} />
                                </span>
                            ),
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