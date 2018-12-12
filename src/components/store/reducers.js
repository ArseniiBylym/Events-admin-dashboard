import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import {tempEvents, orgList} from './tempData'
import {
    ADD_CURRENT_ORG, 
    REMOVE_CURRENT_ORG, 
    ADD_NEW_ORG,
    DELETE_ORG,
    INITIALIZE_ORGS,

    ADD_CURRENT_EVENT,
    REMOVE_CURRENT_EVENT,
    ADD_NEW_EVENT,
    DELETE_EVENT,
    INITIALIZE_EVENTS,
} from './actionTypes'


const events = (state = {}, action) => {
    switch (action.type) {
        case INITIALIZE_EVENTS:
            return {
                eventsList: action.events
            }
        case ADD_CURRENT_EVENT: 
            return {
                ...state,
                currentEvent: action.event
            }
        case REMOVE_CURRENT_EVENT: 
        return {
            ...state,
            currentEvent: null
        }
        case ADD_NEW_EVENT: 
            return {
                ...state,
                eventsList: state.eventsList.concat(action.newEvent)
        }
        case DELETE_EVENT: 
            const newList = state.eventsList.filter((item, i) => (i !== action.index))
            return {
                ...state,
                eventsList: newList
        }
        default: 
            return state
    }
}

const organizators = (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case INITIALIZE_ORGS: 
            return {
                orgList: action.orgs
            }
        case ADD_CURRENT_ORG: 
            return {
                ...state,
                currentOrg: action.org
            }
        case REMOVE_CURRENT_ORG: 
            return {
                ...state,
                currentOrg: null
            }
        case ADD_NEW_ORG: 
            return {
                ...state,
                orgList: state.orgList.concat(action.newOrg)
            }
        case DELETE_ORG: 
            const newList = state.orgList.filter((item, i) => (i !== action.index))
            return {
                ...state,
                orgList: newList
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

