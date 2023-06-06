import { createStore ,combineReducers} from 'redux';
const defaultUser = {
    id:'',
    name:'',
    email:'',
    headImg:'',
    token:''
}
const GET_USER = 'GET_USER';
// const DELETE_USER = 'DELETE_USER';
function userReducer(state = defaultUser, action) {
    switch(action.type){
        case GET_USER:{
            return {
                id:localStorage.getItem('id'),
                name:localStorage.getItem('id'),
                email:localStorage.getItem('id'),
                headImg:localStorage.getItem('id'),
                token:localStorage.getItem('id')
            }
        }
        default:
            return state;
    }

}
function affairReducer(state = [], action) {
    return state;
}
const allReducers = {
    user:userReducer,
    affairList:affairReducer
}
const rootReducer = combineReducers(allReducers);
let store = createStore(rootReducer)

function updateUser(info){
    return {
        type:GET_USER,
        payload:info
    }
}
let unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
})
// console.log(store.getState());
store.dispatch(updateUser(''));
unsubscribe();
// console.log(store.getState());



export default store;