'use strict';

import {
    Grid,
    TextField,
    Input,
    Typography,
    Divider,
    Select,
    MenuItem
} from '@material-ui/core';

import Highlight from 'react-highlight';

class HTML extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container >
                <Grid item xs={6} style={{borderRightStyle: 'solid', borderRightWidth: 'thin', paddingLeft: '10px', paddingRight: '10px'}}>
                    <Typography variant='subheading'>
                        HTML Editor
                    </Typography>
                    <Divider/>
                    <TextField 
                        id='note-html-text'
                        placeholder='Write html'
                        style={{position: 'absolute', height: 'inherit', margin: '10px', width: '45%'}}
                        multiline={true}
                        InputProps={{disableUnderline: true}}
                        defaultValue={this.props.content}
                        onChange={(event) => {this.props.onEditNote(this.props.note._id, event.target.value);}}
                    />
                </Grid>
                <Grid item xs={6} style={{paddingLeft: '10px', paddingRight: '10px'}}>
                    <Typography variant='subheading'>
                        HTML Preview
                    </Typography>
                    <Divider/>
                    <Highlight id='note-html-code' innerHTML={true}>
                        {this.props.content}
                    </Highlight>  
                </Grid>
            </Grid>
        );
    }
}

export default HTML;