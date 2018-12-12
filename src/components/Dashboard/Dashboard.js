import React, { Component } from 'react';
import './Dashboard.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Sidebar from './Sidebar/Sidebar'
import Events from '../Events/Events';
import Organizators from '../Organizators/Organizators'
import { Route, Switch } from "react-router-dom"


class Dashboard extends Component {
    state = {
        
    }

    render() {
        return(
            <div className='Dashboard'>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className='grow'>
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="Dashboard__maniContent">
                    <div className='Dashboard__sidebar'>
                        <Sidebar />
                    </div>
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


export default Dashboard