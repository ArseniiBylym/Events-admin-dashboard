import React, { Component } from 'react';
import './EventForm.scss';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import MenuItem from '@material-ui/core/MenuItem';
import {createNewEvent, updateCurrentEvent} from '../../store/actions'
import {
    REMOVE_CURRENT_EVENT,
    INIT_EVENTS_STATE,
    CLEAR_EVENTS_STATE
} from '../../store/actionTypes'



const validate = values => {
    const errors = {}
    const requiredFields = [
        'name',
        'date',
        'organizator',
        'place',
        'target_market'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'The field is required'
        }
    })
    if(values.date && (+new Date(values.date) < +new Date())){
        errors.date = 'Please shoose a future date'
    }
    
    return errors
}

class EventForm extends Component {
    state = {
        name: '',
        date: '',
        organizator: '',
        place: '',
        target_market: '',
    }

    renderTextField = ({
        input,
        label,
        type,
        meta: { touched, error },
        ...custom
    }) => {
        return <TextField
            label={label}
            helperText={touched && error}
            margin="dense"
            type={type}
            error={touched && error && true}
            fullWidth
            InputLabelProps={{
                shrink: true 
            }}
            {...input}
            {...custom}
        />
    }
    renderSelectField = ({
        input,
        label,
        type,
        children,
        meta: { touched, error },
        ...custom
    }) => {
        return <TextField
            label={label}
            helperText={touched && error}
            margin="dense"
            type={type}
            select
            error={touched && error && true}
            fullWidth
            InputLabelProps={{
                shrink: true 
            }}
            children={children}
            {...input}
            {...custom}
        >
        </TextField>
    }
    renderFileField = ({
        name,
        input,
        label,
        type,
        meta: { touched, error },
        ...custom
    }) => {
        return  <TextField
        label={label}
        helperText={touched && error}
        error={touched && error && true}
        margin="dense"
        type="file"
        fullWidth
        InputLabelProps={{
            shrink: true 
        }}
        onChange={this.handleChangeFile('img')}
        {...custom}
    />
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeFile = name => event => {
        if(event.target && event.target.files) {
            this.setState({
                img: event.target.files[0],
            });
        }
    };

    updateFormHandler = (reset) => {
        reset()
        this.props.onClose()
        this.props.updateCurrentEvent(this.state, this.props.orgList)
    }

    createFormHandler = (reset) => {
        reset()
        this.props.onClose()
        this.props.createNewEvent(this.state, this.props.orgList)
    }

    componentDidMount = () => {
       if(this.props.currentEvent){
           this.props.initEvent(this.props.currentEvent)
           this.setState({
               ...this.props.currentEvent,
               organizator: this.props.currentEvent.organizator.id
           })
        }
    }
    
    componentWillUnmount = () => {
        this.props.clearInitialState()

        if(this.props.currentEvent) {
            this.props.removeCurrentEvent()
        }
    }

    render() {

        const { pristine, reset, invalid,} = this.props

        return(
            <Dialog
            className='EventForm'
            open={this.props.open}
            onClose={this.props.onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Add new event</DialogTitle>
            <DialogContent>
                <Field
                    name="name"
                    component={this.renderTextField}
                    label="Event name"
                    type='text'
                    onChange={this.handleChange("name")}
                />
                <Field
                    name="date"
                    component={this.renderTextField}
                    label="Date"
                    type='date'
                    onChange={this.handleChange("date")}
                />
                <Field
                    name="organizator"
                    component={this.renderSelectField}
                    label="Oranizator"
                    type='select'
                    select
                    onChange={this.handleChange("organizator")}
                >
                {this.props.orgList.map((item, i) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
                </Field>
                 <Field
                    name="place"
                    component={this.renderTextField}
                    label="Place"
                    type='text'
                    onChange={this.handleChange("place")}
                />
                 <Field
                    name="target_market"
                    component={this.renderTextField}
                    label="Target market"
                    type='test'
                    onChange={this.handleChange("target_market")}
                />
                 <Field
                    name="img"
                    component={this.renderFileField}
                    label="Image"
                    type='file'
                />
               
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.onClose} color="primary">
                    Cancel
                </Button>
                <Button disabled={pristine || invalid} onClick={this.props.currentEvent ? this.updateFormHandler.bind(this, reset) : this.createFormHandler.bind(this, reset)} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        eventsList: state.events.eventsList,
        currentEvent: state.events.currentEvent,
        orgList: state.organizators.orgList,
        initialValues: state.eventFormInit.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createNewEvent: (data, orgList) => dispatch(createNewEvent(data, orgList)),
        updateCurrentEvent: (data, orgList) => dispatch(updateCurrentEvent(data, orgList)),
        initEvent: (data) => (dispatch({type: INIT_EVENTS_STATE, data: data})),
        removeCurrentEvent: () => (dispatch({type: REMOVE_CURRENT_EVENT})),
        clearInitialState: () => (dispatch({type: CLEAR_EVENTS_STATE})),
    }
}

EventForm = reduxForm({ 
    form: 'eventForm',
    validate,
})(EventForm);

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)