'use strict';

import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Tooltip
} from '@material-ui/core';


class EditorOptionMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl style={{float: 'right'}} id="note-type-options" >
                <InputLabel htmlFor="note-type">Type</InputLabel>
                <Tooltip id="tooltip-icontype" title="Changing type erases current content">
                <Select
                    value={this.props.type}
                    onChange={(event) => this.props.onTypeChange(this.props.noteId, event.target.value)}
                    inputProps={{
                        name: 'type',
                        id: 'note-type',
                    }}
                >
                    <MenuItem value='text'>Plain Text</MenuItem>
                    <MenuItem value='markdown'>Markdown</MenuItem>
                    <MenuItem value='html'>HTML</MenuItem>
                    <MenuItem value='codesnippet'>Code Snippet</MenuItem>
                    <MenuItem value='todolist'>To Do</MenuItem>
                </Select>
                </Tooltip>
            </FormControl>
        )
    }
}

export default EditorOptionMenu;
