'use strict';

import {
    Grid,
    TextField
} from '@material-ui/core';


// tagging section
class TagsSection extends React.Component {
    constructor(props) {
        super(props);
    }

    onUpdateTags(event) {
        let tags = event.target.value;

        this.props.onUpdateTag(this.props.noteId, tags);
    }

    render() {
        const tagsRoot = {
            border: '1px solid #ced4da',
            fontSize: '13px',
            color: '#BDBDBD'
        }
        return (
            <Grid id="note-tags-grid" item xs={12} style={{minHeight: '50px', marginLeft: '20px'}}>
                <TextField 
                    id="note-tags"
                    placeholder='Tag it up'
                    multiline={true}
                    rowsMax={2}
                    defaultValue={this.props.tags}
                    onChange={(event) => this.onUpdateTags(event)}
                    style={{position: 'absolute', width: '80%'}}
                />
            </Grid>
        )
    }
}

export default TagsSection;