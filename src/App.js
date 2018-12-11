import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { connect } from 'react-redux';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[300],
    },
    secondary: {
      main: grey[300],
    }
  },
});

class App extends Component {
  render() {

    const isLogin = localStorage.getItem('name')
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <div>
              {!isLogin && (
                <Switch>
                  <Route path='/login' exact component={Login} />
                  <Redirect from='/' to='/login' />
                </Switch>
              )}
              {isLogin && (
                <Switch>
                  <Route path='/home' component={Dashboard} />
                  <Redirect exact from='/' to='/home' />
                </Switch>
              )}
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps, null)(App);