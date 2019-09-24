// import {
//     combineReducers
// } from 'redux';

import Immutable from 'immutable';
import {
    combineReducers
} from 'redux-immutable';


import {
    About
} from './about/reducer';
import { Home } from './home/reducer';

// 合并到主reducer
// const reducers = Immutable.fromJS({
//     "About": About,
//     "Home": Home
// });


const reducers = {
    About,
    Home
};

console.log(reducers, 'reducersreducersreducersreducersreducersreducers');

// combineReducers() 函数用于将分离的 reducer 合并为一个 reducer 
export default combineReducers(reducers);
//