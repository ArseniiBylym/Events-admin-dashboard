import React, { Component } from 'react';
import './OrgForm.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';

class OrgForm extends Component {
    state = {

    }

    render() {
        return (
            <Dialog
                className='OrgForm'
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new organizator</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Website"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Logo"
                            type="file"
                            fullWidth
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.onClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentOrg: state.organizators.currentOrg
    }
}

export default connect(mapStateToProps, null)(OrgForm)