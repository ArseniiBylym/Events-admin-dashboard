import { put, takeLatest, takeEvery, take, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {firebaseDB} from '../../utils/firebase.config'
import {
    INITIALIZE_ORGS,
    INITIALIZE_EVENTS,
    GET_ORGS_SAGA,
    GET_EVENTS_SAGA
} from './actionTypes'


export default function* rootSaga() {
    console.log('saga is running')
   yield all([
       getEventWatcher(),
    //    getOrgsWatcher()
   ])
}


function* dfddf(action){
    console.log(action)
    console.log('from worker')
    try {
        firebaseDB.ref('/events').once('value')
            .then(snapshot => {
                let events = []
                snapshot.forEach((item, i) => {
                    events.push(item.val())
                })
                console.log(events)
            }).catch(e => {
                console.log(e.message)
            })

       
        // console.log(eventsList)
        // yield put({type: INITIALIZE_EVENTS, payload: eventsList})
     } catch {

     }
}
export function* getEventWatcher() {
    console.log('from watcher')
    yield takeEvery('GET_EVENTS_SAGA', dfddf)
    // yield takeEvery(GET_EVENTS_SAGA, console.log('gogogo'))
}