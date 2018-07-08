'use strict';

import {
    Grid,
    Typography,
    Divider
} from '@material-ui/core';

import CardsView from 'pages/components/contentView/cardsView';

class ContentSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let gridId = "content-section-" + this.props.type;
        return (
            <Grid id={gridId} container spacing={24} style={{margin: '15px', paddingTop: '20px'}} direction="row">
                <Grid item xs={12}>
                    <Typography variant="headline" gutterBottom>
                        {this.props.title}
                    </Typography>

                    <Divider />
                </ Grid>

                <CardsView 
                    {...this.props}
                />
            </Grid>
        );
    }
}

export default ContentSection;