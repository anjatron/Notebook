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
            <Grid container spacing={8} alignItems="center" justify="center" direction="row" style={{paddingTop: '50px'}}>
                <Grid item xs={12}> 
                    <Typography variant="display1" gutterBottom>
                    Hello, {this.props.username}! 
                    Welcome to your profile. 
                    </Typography>
                </Grid>

                <Grid item xs={12}>
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