import 'isomorphic-unfetch';
import Immutable from 'immutable';


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
const toQueryString = (obj) => {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

const inita = (data) => {
    return function (dispatch) {
        dispatch({
            type: "ADIMPRESSION_APPCODE",
            payload: data
        })
    }
}

const getTablesNoData = (data) => {
    return async function (dispatch) {

        await dispatch({
            type: "PAGE1_LOADING",
            payload: true
        })

        dispatch({
            type: "PAGE1_OFFSET",
            payload: data.offset
        })

        dispatch({
            type: "PAGE1_LIMIT",
            payload: data.limit
        })

        let res = await fetch("http://youyong.ba:8080/mock/5d8c57403908d745b308239c/example/cname", {
            method: 'GET',
            // mode: 'cors',
            // cache: 'force-cache',
            headers: {
                'Cache-Control': 'no-cache',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer xxx'
            },
            type: 'fetch'
            // cache: 'default',
            // body: toQueryString(data)
        });

        let json = await res.json();

        await dispatch({
            type: "PAGE1_TABLEDATA",
            payload: json.data
        })

        // await dispatch({
        //     type: "PAGE1_TOTAL",
        //     payload: json.total
        // })


        // await dispatch({
        //     type: "PAGE1_LOADING",
        //     payload: false
        // })
    }
}

const getTables = (data) => {
    return async function (dispatch) {





        // let res = await fetch("http://youyong.ba:8080/mock/5d8c57403908d745b308239c/example/cname", {
        //     method: 'GET',
        //     mode: 'cors',
        //     cache: 'force-cache',

        //     headers: {
        //         'Cache-Control': 'no-cache',
        //         'Authorization': 'Bearer xxx'
        //     }


        // });



        let res = await fetch(`https://api.youyong.ba/list?page=${data.offset - 1}&keyword=${encodeURI(data.keyword)}`, {
            // let res = await fetch(`http://localhost:8081/list?page=${data.offset - 1}&keyword=${encodeURI(data.keyword)}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer xxx'
            }

        });

        let json = await res.json();



        await dispatch({
            type: "ABOUT_OFFSET",
            payload: data.offset
        })



        await dispatch({
            type: "ABOUT_TOTAL",
            payload: json.total
        })

        await dispatch({
            type: "ABOUT_TABLEDATA",
            payload: json.data
        })

    }
}

const getCharts = (data) => {
    return async function (dispatch) {
        let res = await fetch("https://www.easy-mock.com/mock/5a2dca93e9ee5f7c09d8c6d7/Aaa/demo", {
            method: 'GET',
            // mode: 'cors',
            type: 'fetch',
            cache: 'default'

        });

        let json = await res.json();


        dispatch({
            type: "ADIMPRESSION_APPCODE",
            payload: json.number2
        })

    }

}

const setStartPage = (data) => {
    return async function (dispatch) {

        dispatch({
            type: "ABOUT_STARTPAGE",
            payload: data
        })
    }
}

const sendPassword = (data) => {
    return async function (dispatch) {
        let res = await fetch(`https://api.youyong.ba/getPassword?phone=${data}`, {
            method: 'GET',
            // mode: 'cors',
            // cache: 'force-cache',
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer xxx'
            },
            type: 'fetch'
            // cache: 'default',
            // body: toQueryString(data)
        });

        let json = await res.json();

        console.log(json, 'json');
    }
}

const getToken = (data, router) => {
    return async function (dispatch) {
        console.log(data, 'data');
        // {phoneNumber: "18600190151", volidCode: "111111"}
        // let res = await fetch(`http://localhost:8081/accessToken?phone=${data.phoneNumber}`, {
        // let res = await fetch(`https://api.youyong.ba/accessToken?phone=${data.phoneNumber}`, {
        let res = await fetch(`https://api.youyong.ba/token`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'fetch',
            body: JSON.stringify(data)
        });

        let json = await res.json();

        console.log(json, 'json');

        if (json.status) {
            setCookie('userId', json.data.id);
            setCookie('userName', decodeURIComponent(json.data.username));
            setCookie('avatar', json.data.avatar);
            setCookie('phone', decodeURIComponent(json.data.phone));
            setCookie('token', json.data.token);
            Toast.success("登录成功");
            router.back();
        } else {
            // import { message, Button } from 'antd';
            Toast.fail("令牌获取失败");
        }

    }
}


const sendSwim = (data, token, router) => {
    return async function (dispatch) {


        // let res = await fetch(`https://api.youyong.ba/insert?userId=${data.userId}&endTime=${data.endTime}&price=${data.price}&img=${data.imageUrl}&isOver=${data.isOver}&title=${data.title}&sendUser=${data.sendUser}&startTime=${data.endTime}&num=${data.userNum}&endNum=${data.userNum}&thumb=${data.thumb}&pinyin=${data.py}`, {
        //     method: 'GET',
        //     headers: {
        //         'Cache-Control': 'no-cache',
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //         'Content-Type': 'application/json',
        //         'Authorization': token
        //     }
        // });


        // let res = await fetch(`https://api.youyong.ba/insert?userId=${data.userId}&endTime=${data.endTime}&price=${data.price}&img=${data.imageUrl}&isOver=${data.isOver}&title=${data.title}&sendUser=${data.sendUser}&startTime=${data.endTime}&num=${data.userNum}&endNum=${data.userNum}&thumb=${data.thumb}&pinyin=${data.py}`, {
        let res = await fetch(`https://api.youyong.ba/insert?userId=${data.userId}&endTime=${data.endTime}&price=${data.price}&img=${data.imageUrl}&isOver=${data.isOver}&title=${data.title}&sendUser=${data.sendUser}&startTime=${data.endTime}&num=${data.userNum}&endNum=${data.userNum}&thumb=${data.thumb}&pinyin=${data.py}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        let json = await res.json();
        console.log(json, 'jsonjson');

        if (json.status) {
            Toast.success("发布成功");
            return json.status;
        } else {
            if (json.msg == -1) {
                Toast.fail("未登录");
                console.log(router);
                router.push("/Login");
                return -1;
            } else {
                Toast.fail("发布失败");
                return json.status;
            }

        }
    }
}

const okBaoming = (data, token, router) => {
    return async function (dispatch) {
        let res = await fetch(`https://api.youyong.ba/okbaoming`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            type: 'fetch',
            body: JSON.stringify(data)
        });

        let json = await res.json();


        if (json.status) {
            Toast.success("报名成功");
            return json.status;
        } else {
            if (json.msg == -1) {
                Toast.fail("未登录");
                router.push("/Login");
                return -1;
            } else {
                Toast.fail("报名失败");
                return json.status;
            }
        }
        console.log(json, 'jsonjsonjson');
        console.log(data, '参数');
        console.log(token, 'token');
    }
}


const getEntered = (id, token) => {
    return async function (dispatch) {
        // let res = await fetch(`http://www.easy-mock.com/mock/5c578cecde5c260cd71d3b63/youyongba/signUpUserList?id=${id}`, {
        // let res = await fetch(`http://localhost:8081/getBaomingList?id=${id}`, {
        let res = await fetch(`https://api.youyong.ba/getBaomingList?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });


        let json = await res.json();
        console.log(json, 'jsonjosnjosn');
        if (json.status) {
            dispatch({
                type: "PAGE1_USERLIST",
                payload: json.data
            });
        } else {
            if (json.msg == -1) {
                return json.msg
            } else {
                dispatch({
                    type: "PAGE1_USERLIST",
                    payload: json.data
                });
            }
        }



    }
}





export {
    getCharts,
    inita,
    okBaoming,
    getTables,
    getTablesNoData,
    setStartPage,
    sendPassword,
    getToken,
    sendSwim,
    getEntered
}