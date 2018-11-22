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

const styles = {
    textFieldWrapper: {
        width: '75%',
        display: 'inline-block'
    },
    imgStyles: {
        position: 'relative'
    },
    imgSrcLink: {
        fontSize: '7px', 
        marginLeft: '15px', 
        position: 'absolute'
    },
    loginButton: {
        float: 'right'
    }
};

class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: undefined
        };
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.loggedIn) {
            this.props.history.push('/home');
        }

        return true;
    }

    onLoginUser() {
        if (this.state.username === undefined) {
            // validation error
        } else {
            this.props.onLoginUser(this.state.username);
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <Grid id='content-view-grid-nothing-to-display' container alignItems='center' justify='center' direction='row' style={{paddingTop: '65px'}}>
                    <CircularProgress />
                    <Typography variant='headline'>
                        Logging in... 
                    </Typography>
                </Grid>
            );
        }

        return (
            <Grid container spacing={8} alignItems='center' justify='center' direction='row'>
                <Grid item xs={12}>
                    <img src={helloThereImg} height='450px' width='100%' style={styles.imgStyles}/>
                </Grid>
                <Grid item xs={12}>
                    <a href='https://imgflip.com/i/1r3fn3' target='_blank' style={styles.imgSrcLink}>(imgflip)</a>
                </Grid>

                <Grid item xs={5} style={{marginTop: '10px'}}>
                    <div style={styles.textFieldWrapper}>
                        <TextField
                            required
                            id='login-username'
                            defaultValue={this.state.username}
                            onChange={(event) => {
                                this.setState({
                                    username: event.target.value
                                });
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
                        />
                    </div>
                    <Button style={styles.loginButton} color='primary' onClick={() => this.onLoginUser()}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default Account;