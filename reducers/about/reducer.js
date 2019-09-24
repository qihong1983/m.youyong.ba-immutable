import Immutable from 'immutable';

const About = (state, action) => {

    if (typeof state === "undefined") {
        //初始化
        // return {
        //     tableData: []
        // }

        return Immutable.fromJS({
            offset: 1,
            tableData: []
        })
    }

    switch (action.type) {
        case "ABOUT_TABLEDATA":

            console.log(state, '###########');

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
    About
};