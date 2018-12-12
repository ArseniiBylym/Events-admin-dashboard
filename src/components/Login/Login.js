import React, { Component } from 'react';
import './Login.scss';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PermIdentity from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';

const validate = values => {
    const errors = {}
    const requiredFields = [
        'name',
        'password',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'The field is required'
        }
    })
    return errors
}

class Login extends Component {
    state = {
        name: '',
        password: '',
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    renderTextNameField = ({
        name,
        input,
        label,
        meta: { touched, error },
        ...custom
    }) => {
        return <TextField
            label={label}
            helperText={touched && error}
            value={this.state[name]}
            margin="dense"
            error={touched && error && true}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentity />
                  </InputAdornment>
                ),
              }}
            {...input}
            {...custom}
        />
    }

    renderTextPasswordField = ({
        name,
        input,
        label,
        meta: { touched, error },
        ...custom
    }) => {
        return <TextField
            label={label}
            helperText={touched && error}
            value={this.state[name]}
            margin="dense"
            error={touched && error && true}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            {...custom}
            {...input}
        />
    }

    sendFormHander = () => {
        this.props.login(this.state.name, this.state.password)
        this.props.history.push('/home/events')
    }

    render() {
        const { pristine, invalid } = this.props

        return (
            <div className='Login'>
                <Paper className='customPaper' elevation={4}>
                <AccountCircle className='loginLogo' color='primary'/>
                    <form onSubmit={this.sendFormHander} noValidate autoComplete="off">
                        <Grid container direction='column' wrap='nowrap' justify='center' spacing={16}>
                            <Grid item sm={12}>
                                <Field
                                    name="name"
                                    component={this.renderTextNameField}
                                    label="Name"
                                    onChange={this.handleChange("name")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Field
                                    name="password"
                                    component={this.renderTextPasswordField}
                                    label="Password"
                                    type='password'
                                    onChange={this.handleChange("password")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Button fullWidth variant="contained" color="primary" disabled={pristine || invalid} onClick={this.sendFormHander}  >
                                    Log In
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (name, password) => { dispatch({ type: 'LOGIN', name: name, password: password }) }
    }
}

Login = reduxForm({
    form: 'loginForm',
    validate,
})(Login);

export default connect(null, mapDispatchToProps)(Login)