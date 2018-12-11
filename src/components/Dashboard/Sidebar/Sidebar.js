import React from 'react';
import './Sidebar.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
import { NavLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import {connect} from 'react-redux';
import InputIcon from '@material-ui/icons/Input';
import EventIcon from '@material-ui/icons/Event';
import GroupIcon from '@material-ui/icons/Group';



function Sidebar(props) {

        return(
            <div className='Sidebar'>
                <List>
                    <NavLink to='/home/events'>
                        <ListItem button>
                            <ListItemIcon><EventIcon/></ListItemIcon>
                            <ListItemText primary='Events' />
                        </ListItem>
                    </NavLink>
                    <NavLink to='/home/organizators'>
                        <ListItem button>
                            <ListItemIcon ><GroupIcon/></ListItemIcon>
                            <ListItemText primary='Organizators' />
                        </ListItem>
                    </NavLink>
                    <Divider style={{margin: '20px 0'}}/>
                    <ListItem button onClick={props.logout}>
                            <ListItemIcon><InputIcon/></ListItemIcon>
                            <ListItemText primary='Logout' />
                    </ListItem>

                </List>
            </div>
        )
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => (dispatch({type: 'LOGOUT'}))
    }
}

export default connect(null, mapDispatchToProps)(Sidebar)