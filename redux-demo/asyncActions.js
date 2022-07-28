import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import axios from 'axios'

const thunkMiddlewareObj = thunkMiddleware.default;

const initialState = {
     loading: false,
     user: [],
     error:'',
 }

const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED';
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

const fetchUsersRequest = () => {
    return {
        type : FETCH_USER_REQUESTED
    }
}

const fetchUsersSucceed = (_user) => {
    return {
        type: FETCH_USER_SUCCEEDED,
        payload:_user,
    
    }
}

const fetchUsersFailed = (error) => {
    return {
        type :FETCH_USER_FAILED,
        payload: error
    }
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUESTED: 
        return {
           ...state,
            loading:true,
        }
        case FETCH_USER_SUCCEEDED: 
        return {
            loading:false,
            user:action.payload,
            error: ""
        }
        case FETCH_USER_FAILED: 
        return {
            loading:false,
            users:[],
            error:action.payload,
        }
    }
}
// API 
const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
            // response.data IS THE USERS
            const users = response.data.map((user) => user.id);
            dispatch(fetchUsersSucceed(users))
        }).catch((error) =>{
            dispatch(fetchUsersFailed(error.message))
            // ERROR MESSAGE
        } )
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddlewareObj));
store.subscribe(()=> {
    console.log(store.getState())
});
store.dispatch(fetchUsers());





  
