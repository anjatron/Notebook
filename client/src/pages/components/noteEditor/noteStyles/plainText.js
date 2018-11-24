'use strict';

import {
    Grid,
    TextField
} from '@material-ui/core';

class PlainText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // grey out paper a bit
        return (
            <TextField 
                id="note-plaintext"
                placeholder='Edit note...'
                style={{position: 'absolute', height: 'inherit', margin: '10px', width: '95%'}}
                multiline={true}
                InputProps={{disableUnderline: true}}
                defaultValue={this.props.content}
                onChange={(event) => {this.props.onEditNote(this.props.note._id, event.target.value);}}
            />
        );
    }
}

export default PlainText;