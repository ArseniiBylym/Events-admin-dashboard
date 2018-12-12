import React, { Component } from 'react';
import './OrgForm.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import {getBase64} from '../../../utils/transformFunc'
import {ADD_NEW_ORG, REMOVE_CURRENT_ORG, UPDATE_ORG} from '../../store/actionTypes'
import {firebaseDB} from '../../../utils/firebase.config'


const validate = values => {
    const errors = {}
    const requiredFields = [
        'name',
        'email',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'The field is required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

class OrgForm extends Component {
    state = {
        name: '',
        email: '',
        logo: '',
        site: '',
    }

    renderTextField = ({
        name,
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
        id="name"
        label="Logo"
        type="file"
        fullWidth
        InputLabelProps={{
            shrink: true 
        }}
        onChange={this.handleChangeFile('logo')}
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
                logo: event.target.files[0],
            });
        }
    };

    updateFormHandler = (reset) => {
        console.log('update')
        reset()
        this.props.onClose()

        if(this.state.logo && typeof(this.state.logo) !== 'string') {
            getBase64(this.state.logo).then(dataFile => {
                firebaseDB.ref('/organizators/' + this.state.id).set({
                    ...this.state,
                    logo: dataFile
                }).then((snapshot) => {
                    this.props.updateOrg({
                        ...this.state,
                        // id: snapshot.key,
                        logo: dataFile
                    })
                }).catch(e => {
                    alert(e.message)
                })
               
            })
        } else {
            firebaseDB.ref('/organizators/' + this.state.id).set({
                ...this.state,
                logo: this.state.logo || ''
            }).then((snapshot) => {
                this.props.updateOrg({
                    ...this.state,
                    // id: snapshot.key,
                    logo: this.state.logo || ''
                })
            }).catch(e => {
                alert(e.message)
            })
            
        }

    }

    createFormHandler =  (reset) => {
        // console.log(this.state)
        reset()
        this.props.onClose()

        if(this.state.logo && typeof(this.state.logo) !== 'string') {
            getBase64(this.state.logo).then(dataFile => {
                firebaseDB.ref('/organizators/').push({
                    ...this.state,
                    logo: dataFile
                }).then((snapshot) => {
                    this.props.addNewOrg({
                        ...this.state,
                        id: snapshot.key,
                        logo: dataFile
                    })
                }).catch(e => {
                    alert(e.message)
                })
               
            })
        } else {
            firebaseDB.ref('/organizators/').push({
                ...this.state,
                logo: this.state.logo || ''
            }).then((snapshot) => {
                this.props.addNewOrg({
                    ...this.state,
                    id: snapshot.key,
                    logo: this.state.logo || ''
                })
            }).catch(e => {
                alert(e.message)
            })
            
        }
    }

    componentDidUpdate = (pverState, prevProps) => {
        console.log(this.state)
    }

    componentDidMount = () => {
        console.log(this.state)
        if(this.props.currentOrg) {
            this.props.initOrg(this.props.currentOrg)
            this.setState({
                ...this.props.currentOrg,
            })
        }
    }
    
    componentWillUnmount = () => {
        this.props.clearInitialState()

    }



    render() {
        const { handleSubmit, pristine, reset, invalid, submitting } = this.props

        return (
            <Dialog
                className='OrgForm'
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new organizator</DialogTitle>
                <DialogContent>
                    <Field
                        name="name"
                        component={this.renderTextField}
                        label="Name"
                        type='text'
                        onChange={this.handleChange("name")}
                    />
                    <Field
                        name="email"
                        component={this.renderTextField}
                        label="Email"
                        type='email'
                        onChange={this.handleChange("email")}
                    />
                    <Field
                        name="site"
                        component={this.renderTextField}
                        label="Website"
                        type='text'
                        onChange={this.handleChange("site")}
                    />
                    <Field
                        name="logo"
                        component={this.renderFileField}
                        label="Logo"
                        type='file'
                    />
                   
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={pristine || invalid} onClick={this.props.currentOrg ? this.updateFormHandler.bind(this, reset) : this.createFormHandler.bind(this, reset)} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentOrg: state.organizators.currentOrg,
        initialValues: state.orgFormInit.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewOrg: (newOrg) => (dispatch({type: ADD_NEW_ORG, newOrg: newOrg})),
        initOrg: (data) => (dispatch({type: 'INIT_ORGS_STATE', data: data})),
        removeCurrentOrg: () => (dispatch({type: REMOVE_CURRENT_ORG})),
        clearInitialState: () => (dispatch({type: 'CLEAR_ORGS_STATE'})),
        updateOrg: (data) => (dispatch({type: UPDATE_ORG, data: data}))
    }
}


OrgForm = reduxForm({ 
    form: 'orgForm',
    validate,
})(OrgForm);

export default connect(mapStateToProps, mapDispatchToProps)(OrgForm)