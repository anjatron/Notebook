'use strict';

import {
    Clear
} from '@material-ui/icons';

import {
    Grid,
    Typography,
    Button,
    IconButton, 
    Card,
    CardContent
} from '@material-ui/core';

class ErrorBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let errorMessage = (this.props.error.message) ? this.props.error.message : 'Whoops! An error occured...';
        return (
            <Card id='error-banner' style={{height: '60px', background: '#FF3232', width: '100%', backgroundColor: '#a94442'}}>
                <CardContent>
                    <Typography variant='subheading' style={{display: 'inline-block', color: 'white'}}>
                        Uh oh! {errorMessage}
                    </Typography>
                    <IconButton color='primary' aria-label='clear' style={{height: '25px', width: '25px', float: 'right', color: 'white'}} onClick={() => this.props.dismiss()}>
                        <Clear />
                    </IconButton>
                </CardContent>
            </Card>
        );
    }
}

export default ErrorBanner;