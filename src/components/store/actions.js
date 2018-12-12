import {
    INITIALIZE_ORGS,
    INITIALIZE_EVENTS,
    ADD_NEW_ORG,
    UPDATE_ORG,
    ADD_NEW_EVENT,
    UPDATE_EVENT,
} from './actionTypes';
import { firebaseDB } from '../../utils/firebase.config'
import { getBase64 } from '../../utils/transformFunc'

export const getEventsFromDB = () => {
    return (dispatch) => {
        firebaseDB.ref('/events').once('value')
            .then(snapshot => {
                let events = []
                snapshot.forEach((item, i) => {
                    let obj = item.val();
                    obj.id = item.key
                    events.push(obj)
                })
                dispatch({ type: INITIALIZE_EVENTS, events: events })
            }).catch(e => {
                console.log(e.message)
            })
    }
}

export const getOrgsFromDB = () => {
    return (dispatch) => {
        firebaseDB.ref('/organizators').once('value')
            .then(snapshot => {
                let orgs = []
                snapshot.forEach((item, i) => {
                    let obj = item.val();
                    obj.id = item.key
                    orgs.push(obj)
                })
                dispatch({ type: INITIALIZE_ORGS, orgs: orgs })
            }).catch(e => {
                console.log(e.message)
            })
    }
}

export const createNewOrg = (data) => {
    return (dispatch) => {

        if (data.logo && typeof (data.logo) !== 'string') {
            getBase64(data.logo).then(dataFile => {
                firebaseDB.ref('/organizators/').push({
                    ...data,
                    logo: dataFile
                }).then((snapshot) => {
                    dispatch({
                        type: ADD_NEW_ORG,
                        newOrg: {
                            ...data,
                            id: snapshot.key,
                            logo: dataFile
                        }
                    })
                }).catch(e => {
                    alert(e.message)
                })

            })
        } else {
            firebaseDB.ref('/organizators/').push({
                ...data,
                logo: data.logo || ''
            }).then((snapshot) => {
                dispatch({
                    type: ADD_NEW_ORG,
                    newOrg: {
                        ...data,
                        id: snapshot.key,
                        logo: data.logo || ''
                    }
                })
            }).catch(e => {
                alert(e.message)
            })

        }
    }
}

export const updateCurrentOrg = (data) => {
    return (dispatch) => {

        if(data.logo && typeof(data.logo) !== 'string') {
            getBase64(data.logo).then(dataFile => {
                firebaseDB.ref('/organizators/' + data.id).set({
                    ...data,
                    logo: dataFile
                }).then(() => {
                    dispatch({
                        type: UPDATE_ORG, 
                        data: {
                            ...data,
                            logo: dataFile
                        }
                    })
                }).catch(e => {
                    alert(e.message)
                })
               
            })
        } else {
            firebaseDB.ref('/organizators/' + data.id).set({
                ...data,
                logo: data.logo || ''
            }).then(() => {
                dispatch({
                    type: UPDATE_ORG, 
                    data: {
                        ...data,
                        logo: data.logo || ''
                    }
                })
            }).catch(e => {
                alert(e.message)
            })
            
        }
    }
}

export const createNewEvent = (data, orgList) => {
    return (dispatch) => {

        const orgData = orgList.find((item, i) => {
            if(item.id === data.organizator) return true
            else return false
         })
         if(data.img && typeof(data.img) !== 'string') {
             getBase64(data.img).then(dataFile => {
                firebaseDB.ref('/events/').push({
                     ...data,
                     organizator: orgData,
                     img: dataFile
                 }).then((snapshot) => {
                     dispatch({
                        type: ADD_NEW_EVENT, 
                        newEvent: {
                            ...data,
                            organizator: orgData,
                            img: dataFile,
                            id: snapshot.key
                        }
                     })
                 }).catch((e) => {
                     console.log(e.message)
                 })
             })
         } else {
             firebaseDB.ref('/events/').push({
                 ...data,
                 organizator: orgData,
             }).then((snapshot) => {
                dispatch({
                    type: ADD_NEW_EVENT, 
                    newEvent: {
                        ...data,
                        organizator: orgData,
                        id: snapshot.key
                    }
                 })
             }).catch((e) => {
                 console.log(e.message)
             })
         }
    }
}


export const updateCurrentEvent = (data, orgList) => {
    return (dispatch) => {
        
        const orgData = orgList.find((item, i) => {
            if(item.id === data.organizator) return true
            else return false
         })
         if(data.img && typeof(data.img) !== 'string') {
             getBase64(data.img).then(dataFile => {
                firebaseDB.ref('/events/' + data.id).set({
                     ...data,
                     organizator: orgData,
                     img: dataFile
                 }).then(() => {
                     dispatch({
                        type: UPDATE_EVENT, 
                        data: {
                            ...data,
                            organizator: orgData,
                            img: dataFile,
                        }
                     })
                    //  this.props.updateEvent({
                    //      ...data,
                    //      organizator: orgData,
                    //      img: dataFile,
                    //  })
                 }).catch((e) => {
                     console.log(e.message)
                 })
             })
         } else {
             firebaseDB.ref('/events/' + data.id).set({
                 ...data,
                 organizator: orgData,
             }).then(() => {
                dispatch({
                    type: UPDATE_EVENT, 
                    data: {
                        ...data,
                        organizator: orgData,
                    }
                 })
                //  this.props.updateEvent({
                //      ...data,
                //      organizator: orgData,
                //  })
             }).catch((e) => {
                 console.log(e.message)
             })
         }
    }
}