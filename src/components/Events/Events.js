import React, { Component } from 'react';
import './Events.scss';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import EventItem from './EventItem/EventItem';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


class Events extends Component {
    state = {
        
    }

    render() {
        let items = null;
        console.log(this.props.eventsList)
        if(this.props.eventsList.length > 0) {
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
                    <Grid item sm={3} className='AddIcon'>
                        <Fab color="primary" aria-label="Add" >
                            <AddIcon /> 
                        </Fab>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        eventsList: state.events.eventsList
    }
}

export default connect(mapStateToProps, null)(Events)