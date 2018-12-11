import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import {tempEvents, orgList} from './tempData'
import {ADD_CURRENT_ORG, RMEOVE_CURRENT_ORG} from './actionTypes'


const events = (state = tempEvents, action) => {
    switch (action.type) {
        default: 
            return state
    }
}

const organizators = (state = orgList, action) => {
    console.log(action)
    switch (action.type) {
        case ADD_CURRENT_ORG: 
            return {
                ...state,
                currentOrg: action.org
            }
        case RMEOVE_CURRENT_ORG: 
            return {
                ...state,
                currentOrg: null
            }
        default: 
            return state
    }
}

const currentUser = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN': 
            if(action.name === 'admin' && action.password === 'password'){
                localStorage.setItem('name', action.name)
                return {
                    userName: action.name,
                    userPassword: action.password
                } 
            } else return state
        case 'LOGOUT': 
            localStorage.removeItem('name')
            return {}
        default: 
            return state
    }
}

const reducers = combineReducers({
    events,
    organizators,
    currentUser,
    form: formReducer
});

export default reducers;

