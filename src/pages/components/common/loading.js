'use strit';

import {
    Grid,
    Typography,
    CircularProgress
} from '@material-ui/core';

class LoadingContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingMessage = (this.props.message) ? this.props.message : 'Loading content...';
        return (
            <Grid id="loading-content" container alignItems="center" justify="center" direction="row" style={{paddingTop: '65px'}}>
                <CircularProgress />
                <Typography variant="headline">
                     {loadingMessage}
                </Typography>
            </Grid>
        )
    }
}

export default LoadingContent;