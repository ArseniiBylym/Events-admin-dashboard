import React, { Component } from 'react';
import './Dashboard.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
// import Input from '@material-ui/icons/Input';
// import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from './Sidebar/Sidebar'
import Events from '../Events/Events';
import Organizators from '../Organizators/Organizators'
import { Route, Switch, Redirect } from "react-router-dom"


class Dashboard extends Component {
    state = {
        
    }



    render() {
        console.log(this.props)
        return(
            <div className='Dashboard'>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className='grow'>
                            Dashboard
                        </Typography>
                        {/* <Button onClick={this.props.logout} color="inherit">
                            Logout
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <div className="Dashboard__maniContent">
                    <div className='Dashboard__sidebar'>
                        <Sidebar />
                    </div>
                    {/* <Events /> */}
                    {/* <Organizators /> */}
                    <div className='Dashboard__maniContainer'>
                        <Switch>
                            <Route path={`${this.props.match.url}/events`} exact component={Events} />
                            <Route path={`${this.props.match.url}/organizators`} exact component={Organizators} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => (dispatch({type: 'LOGOUT'}))
    }
}

export default connect(null, mapDispatchToProps)(Dashboard)