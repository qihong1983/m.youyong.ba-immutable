
import Immutable from 'immutable';

const Home = (state, action) => {

    if (typeof state === "undefined") {
        //初始化
        return Immutable.fromJS({
            tableData: []
        })

        // return {
        //     tableData: []
        // }
    }

    switch (action.type) {
        case "HOME_TABLEDATA":
            // return Object.assign({}, state, {
            //     tableData: action.payload
            // });

            return state.set('tableData', Immutable.fromJS(action.payload));

        default:
            //返回初始化
            return state;
    }
}

export {
    Home
};