import React, { Component } from 'react';
import './EventItem.scss';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import {connect} from 'react-redux';
import {
    ADD_CURRENT_EVENT,
    REMOVE_CURRENT_EVENT,
    DELETE_EVENT
} from '../../store/actionTypes'
import DefaultEventImg from '../../../img/event.png'
import moment from 'moment'
import {firebaseDB} from '../../../utils/firebase.config'


class EventItem extends Component {
    state = {
        isDetailsShow: false
    }

    handleExpandClick = () => {
        this.setState((prevState) => {
            return {
                isDetailsShow: !prevState.isDetailsShow
            }
        })
    }
    deleteHandler  = () => {
        firebaseDB.ref('/events/' + this.props.config.id).set(null)
            .then(() => {
                this.props.deleteEvent(this.props.index)
            })
    }

    editHandler = index => event => {
        this.props.addToCurrentEvent(this.props.config)
        this.props.open()
    }

    render() {
        const { name, date, img, place, target_market, organizator } = this.props.config
        return (
            <Grid item sm={6} lg={4}>
                <Card className='EventItem'>
                    <CardHeader
                        title={name}
                    />
                    <CardMedia
                        className='EventItem__media'
                        image={img ? img : DefaultEventImg}
                    />
                    <CardContent>
                        <List >
                            <ListItem>
                                <ListItemText primary={place} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={moment(date).format('YYYY-MM-DD')} />
                            </ListItem>
                        </List>
                        <Grid container justify='space-between'>
                            <Grid item sm={4}>
                                <Button onClick={this.editHandler()} color='primary'><EditIcon /></Button>
                            </Grid>
                            <Grid item sm={4}>
                                <Button onClick={this.deleteHandler} color='primary'><DeleteIcon /></Button>
                            </Grid>
                            <Grid item sm={4}>
                                <Button color='primary' onClick={this.handleExpandClick}>
                                    {this.state.isDetailsShow ? < ExpandLessIcon/> : <ExpandMoreIcon />}
                                </Button>
                            </Grid>
                        </Grid>

                        <Collapse in={this.state.isDetailsShow} timeout='auto' unmountOnExit >
                            <Typography align='center' gutterBottom={true} className='EventItem__details'>
                                {target_market}
                            </Typography>
                            <Typography variant='subtitle1' className='EventItem__orgHeader'>
                                Organizator
                            </Typography>
                            <List >
                                <ListItem>
                                    <Avatar alt="Remy Sharp" src={organizator.logo} />
                                    <ListItemText primary={organizator.name} secondary={organizator.email} />
                                </ListItem>
                            </List>
                        </Collapse>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addToCurrentEvent: (event) => (dispatch({type: ADD_CURRENT_EVENT, event: event})),
        removeFromCurrentEvent: () => (dispatch({type: REMOVE_CURRENT_EVENT})),
        deleteEvent: (index) => (dispatch({type: DELETE_EVENT, index: index}))
    }
}

export default connect(null, mapDispatchToProps)(EventItem)