import React, { Component } from 'react';
import './Login.scss';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';

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
        console.log(event, name)
        this.setState({
            [name]: event.target.value,
        });
    };

    renderTextField = ({
        name,
        input,
        label,
        meta: { touched, error },
        onChange,
        ...custom
    }) => {
        return <TextField
            label={label}
            helperText={touched && error}
            value={this.state[name]}
            margin="dense"
            error={touched && error && true}
            // InputProps={{
            //     disableUnderline: true
            // }}
            // InputLabelProps={{
            //     shrink: true,
            // }}
            // FormHelperTextProps={{
            //     filled: true,
            //     focused: true
            // }}
            {...input}
            {...custom}
        />
    }

    sendFormHander = () => {
        console.log(this.state)
        this.props.login(this.state.name, this.state.password)
        this.props.history.push('/home/events')
    }



    render() {
        console.log(this.props)
        const { handleSubmit, pristine, reset, invalid, submitting } = this.props

        return (
            <div className='Login'>
                <Paper className='customPaper' elevation={4}>
                    {/* <AppBar color='primary' position="static">
                    <Typography component="h3" variant="display1" gutterBottom>
                        Login
                    </Typography>
                </AppBar> */}
                    <form onSubmit={this.sendFormHander} noValidate autoComplete="off">
                        <Grid container direction='column' wrap='nowrap' justify='center' spacing={16}>
                            <Grid item sm={12}>
                                <Field
                                    name="name"
                                    component={this.renderTextField}
                                    label="Name"
                                    onChange={this.handleChange("name")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Field
                                    name="password"
                                    component={this.renderTextField}
                                    label="Password"
                                    type='password'
                                    onChange={this.handleChange("password")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Button variant="contained" color="primary" disabled={pristine || invalid} onClick={this.sendFormHander}  >
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