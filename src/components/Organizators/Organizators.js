import React, { Component } from 'react';
import './Organizators.scss';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import OrgForm from './OrgForm/OrgForm'
import {ADD_CURRENT_ORG, RMEOVE_CURRENT_ORG} from '../store/actionTypes'



import { connect } from 'react-redux'

class Organizators extends Component {
    state = {
        dialogOpen: false
    }

      handleClickOpen = () => {
        this.setState({ dialogOpen: true });
      };
    
      handleClose = () => {
        if(this.props.currentOrg) {
            this.props.removeCurrentOrg()
        }
        this.setState({ dialogOpen: false });
      };

      editHandler = index => event => {
          this.props.addCurrentOrg(this.props.orgList[index])
          this.handleClickOpen()
      }
    

    render() {
        // console.log(this.props)
        let list = null
        if (this.props.orgList.length > 0) {
            list = this.props.orgList.map((item, i) => {
                return (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container spacing={16}>
                                <Grid item md={1} alignItems='center' alignContent='center' className='centerContent'>
                                    <Avatar alt="Remy Sharp" src={item.logo} />
                                </Grid>
                                <Grid item md={3} alignItems='center' alignContent='center' className='centerContent'>
                                    <Typography >{item.name}</Typography>
                                </Grid>
                                <Grid item md={3} alignItems='center' alignContent='center' className='centerContent'>
                                    <Typography >{item.email}</Typography>
                                </Grid>
                                <Grid item md={3} alignItems='center' alignContent='center' className='centerContent'>
                                    <Typography ><a href={item.site}>{item.site}</a></Typography>
                                </Grid>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails >
                            <Typography >There is could be more info abount organizator</Typography>
                            <Button onClick={this.editHandler(i)} style={{ marginLeft: 'auto' }} color="primary" aria-label="Edit" >
                                <EditIcon />
                            </Button>
                            <Button color="" aria-label="Edit" >
                                <DeleteIcon />
                            </Button>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })
        }

        return (
            <div className='Organizators'>
                <Typography variant='h5' color='primary' gutterBottom={true}>Organizators</Typography>
                {list}
                <Grid onClick={this.handleClickOpen} item sm={3} className='AddIcon'>
                    <Fab color="primary" aria-label="Add" >
                        <AddIcon />
                    </Fab>
                </Grid>
                <OrgForm 
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    currentOrg={this.props.currentOrg}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orgList: state.organizators.orgList,
        currentOrg: state.organizators.currentOrg,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCurrentOrg: (org) => (dispatch({type: ADD_CURRENT_ORG, org: org})),
        removeCurrentOrg: () => (dispatch({type: RMEOVE_CURRENT_ORG}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Organizators)