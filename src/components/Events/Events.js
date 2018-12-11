import React, { Component } from 'react';
import './Events.scss';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import EventItem from './EventItem/EventItem';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EventForm from './EventForm/EventForm'
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    ADD_CURRENT_EVENT,
    REMOVE_CURRENT_EVENT,
    ADD_NEW_EVENT,
    DELETE_EVENT
} from '../store/actionTypes'


class Events extends Component {
    state = {
        dialogOpen: false
    }

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
      };
    
      handleClose = () => {
        // if(this.props.currentOrg) {
        //     this.props.removeCurrentOrg()
        // }
        this.setState({ dialogOpen: false });
      };

    render() {
        let items = null
        console.log(this.props.eventsList)
        if(this.props.eventsList && this.props.eventsList.length > 0) {
            items = this.props.eventsList.map((item, i) => {
               return (<EventItem key={item.id} config={item} index={i}/>)
            })
        }
        return(
            <div className='Events'>
                <Typography variant='h5' color='primary' gutterBottom={true} >
                    Events
                </Typography>
                <Grid container spacing={16}>
                    {items}
                </Grid>
                <Fab onClick={this.handleClickOpen} className='AddIcon' color="primary" aria-label="Add" >
                    <AddIcon /> 
                </Fab>
                {this.state.dialogOpen && <EventForm 
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    currentEvent={this.props.currentEvent}
                />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        eventsList: state.events.eventsList,
        currentEvent: state.events.currentEvent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCurrentEvent: (org) => (dispatch({type: ADD_CURRENT_EVENT, org: org})),
        removeFromCurrentEvent: () => (dispatch({type: REMOVE_CURRENT_EVENT})),
        deleteEvent: (index) => (dispatch({type: DELETE_EVENT, index: index}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)