import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';
import { connect } from 'react-redux'
import { firebaseDB } from './utils/firebase.config'
import {
	GET_ORGS_SAGA,
	GET_EVENTS_SAGA,
	INITIALIZE_ORGS,
	INITIALIZE_EVENTS,
} from './components/store/actionTypes'

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

	componentDidMount = () => {
		firebaseDB.ref('/events').once('value')
			.then(snapshot => {
				let events = []
				snapshot.forEach((item, i) => {
					let obj = item.val();
					obj.id = item.key
					events.push(obj)
				})
				this.props.setEvents(events)
			}).catch(e => {
				console.log(e.message)
			})

		firebaseDB.ref('/organizators').once('value')
			.then(snapshot => {
				let orgs = []
				snapshot.forEach((item, i) => {
					let obj = item.val();
					obj.id = item.key
					orgs.push(obj)
				})
				this.props.setOrgs(orgs)
			}).catch(e => {
				console.log(e.message)
			})
		// this.props.getEvents('some data')

	}

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
		currentUser: state.currentUser
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getEvents: (data) => (dispatch({ type: GET_EVENTS_SAGA, data: data })),
		getOrgs: () => (dispatch({ type: GET_ORGS_SAGA })),
		setEvents: (events) => (dispatch({ type: INITIALIZE_EVENTS, events: events })),
		setOrgs: (orgs) => (dispatch({ type: INITIALIZE_ORGS, orgs: orgs }))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);