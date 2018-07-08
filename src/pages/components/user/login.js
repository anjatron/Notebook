'use strict';

import {
    Grid,
    TextField,
    Button,
    InputAdornment,
    Typography,
    CircularProgress
} from '@material-ui/core';

import {
    AccountCircle
} from '@material-ui/icons';

import helloThereImg from 'imgs/hellothere.jpeg';

class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: undefined
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.loggedIn) {
            this.props.history.push('/home');
        }

        return true;
    }

    onLoginUser() {
        if (this.state.username === undefined) {
            // error
        } else {
            this.props.onLoginUser(this.state.username)
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <Grid id="content-view-grid-nothing-to-display" container alignItems="center" justify="center" direction="row" style={{paddingTop: '65px'}}>
                    <CircularProgress />
                    <Typography variant="headline">
                        Logging in... 
                    </Typography>
                </Grid>
            );
        }

        const imgStyles = {
            left: '22%',
            position: 'relative'
        }
        return (
            <Grid container spacing={8} style={{marginTop: "10%"}} alignItems="center" justify="center" direction="row">
                <Grid item xs={12}>
                    <img src={helloThereImg} height="300px" width="600px" style={imgStyles}/>
                </Grid>
                <Grid item xs={12}>
                    <a href="https://imgflip.com/i/1r3fn3" target="_blank" style={{fontSize: '7px', right: '75%', position: 'absolute'}}>(imgflip)</a>
                </Grid>

                <Grid item xs={4} style={{marginTop: '10px'}}>
                    <TextField
                        required
                        id="login-username"
                        defaultValue={this.state.username}
                        onChange={(event) => {
                            this.setState({
                                username: event.target.value
                            })
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="contained" style={{marginLeft: '15px'}} color="primary" onClick={() => this.onLoginUser()}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default Account;