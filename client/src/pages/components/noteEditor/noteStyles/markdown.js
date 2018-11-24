'use strict';

import {
    Grid,
    TextField
} from '@material-ui/core';

import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';

class Markdown extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SimpleMDE
                id='note-markdown'
                onChange={(value) => this.props.onEditNote(this.props.note._id, value)}
                value={this.props.content}
            />
        );
    }
}

export default Markdown;