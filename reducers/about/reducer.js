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
            startPage: true
        })
    }


    //http://youyong.ba:8080/mock/5d8c57403908d745b308239c/example/cname
    switch (action.type) {
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