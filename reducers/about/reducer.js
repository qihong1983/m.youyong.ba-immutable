import Immutable from 'immutable';

const About = (state, action) => {

    if (typeof state === "undefined") {
        //初始化
        // return {
        //     tableData: []
        // }

        return Immutable.fromJS({
            offset: 1,
            tableData: [],
            startPage: true,
            keyword: "",
            total: 0,
            userList: []
        })
    }


    //http://youyong.ba:8080/mock/5d8c57403908d745b308239c/example/cname
    switch (action.type) {

        case "PAGE1_USERLIST":
            return state.set('userList', Immutable.fromJS(action.payload));
        // userList

        case "ABOUT_TOTAL":
            return state.set('total', Immutable.fromJS(action.payload));

        case "ABOUT_KEYWORD":
            return state.set('keyword', Immutable.fromJS(action.payload));


        case "ABOUT_OFFSET":



            // return Object.assign({}, state, {
            //     tableData: action.payload
            // });


            return state.set('offset', Immutable.fromJS(action.payload));

        case "ABOUT_TABLEDATA":

            console.log(state, '###########');

            // return Object.assign({}, state, {
            //     tableData: action.payload
            // });


            return state.set('tableData', Immutable.fromJS(action.payload));
        case "ABOUT_STARTPAGE":

            console.log(state, '###########');

            // return Object.assign({}, state, {
            //     tableData: action.payload
            // });


            return state.set('startPage', Immutable.fromJS(action.payload));


        default:
            //返回初始化
            return state;
    }
}

export {
    About
};