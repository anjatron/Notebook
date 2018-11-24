'use strict';

import {
    Grid,
    Typography
} from '@material-ui/core';


class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid item xs={12} style={{paddingTop: '50px'}}>
                <Grid container spacing={8} alignItems="center" justify="center" direction="row"> 
                    <Typography variant="display1" gutterBottom>
                        Hello, {this.props.username}! 
                        Welcome to your profile. 
                    </Typography>
                </Grid>

                <Grid container spacing={8} alignItems="center" justify="center" direction="row">
                    <Typography variant="body2">
                        Some sharing info and privileges should go here...
                        Maybe even manag
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default Account;