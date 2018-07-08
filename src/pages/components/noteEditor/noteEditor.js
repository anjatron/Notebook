'use strict';

import {
    Grid,
    TextField,
    Toolbar,
    IconButton,
    Paper,
    Typography,
    Tooltip
} from '@material-ui/core';

import {
    GroupAdd,
    Save
} from '@material-ui/icons';

import BreadCrumbs from 'pages/components/common/breadCrumbs';
import TagsSection from 'pages/components/common/tagsSection';

import NoteStylesContainer from 'pages/containers/smartNoteStyles';
import EditorOptionMenu from 'pages/components/noteEditor/editorOptionMenu';

import NotebookService from 'services/notebookService';
import LoadingContent from 'pages/components/common/loading';

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.clearViewingType();
    }

    componentDidMount() {
        // check if it exists 
        let noteId = this.props.location.pathname.split('/')[2];
        if (noteId) {
            let noteExists = _.find(this.props.notes.slice(), (_note) => {
                return _note._id === noteId;
            });
            if (_.isEmpty(noteExists)) {
                this.props.onGetNote(noteId);
            } else {
                this.props.onOpenNote(noteExists);
            }
        }
    }

    handleName(event) {
        let name = event.target.value;

        this.props.onNameChange(this.props.note._id, name);
    }

    updateNote() {
        NotebookService.createNote(this.props.note);
    }

    render() {
        if (!this.props.note || this.props.viewingType !== 'note') {
            return (
                <LoadingContent message="Setting stuff up..." />
            )
        }

        let notes = (this.props.notes) ? this.props.notes.slice() : [];
        let folders = (this.props.folders) ? this.props.folders.slice() : [];

        return (
            <Grid id="note-editor" container>
                <Grid item xs={12}>
                    <BreadCrumbs
                        history={this.props.history}
                        folders={folders}
                        notes={notes}
                        type='note'
                        path={this.props.note.path}
                    />
                </Grid>
                <Grid item xs={12} style={{height: '60px'}}>
                    <Toolbar>
                            <Grid item xs={4}>
                                <TextField
                                    id="notename"
                                    label="Note Name"
                                    type="input"
                                    margin="normal"
                                    style={{color: '#ffff', margin: '0px'}}
                                    fullWidth={true}
                                    onChange={(event) => this.handleName(event)}
                                    defaultValue={this.props.note.name}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <EditorOptionMenu
                                    type={this.props.note.type}
                                    noteId={this.props.note._id}
                                    onTypeChange={this.props.onNoteTypeChange}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Tooltip id="tooltip-save" title="Save">
                                    <IconButton style={{float: 'right'}} onClick={() => this.updateNote()}>
                                        <Save/>
                                    </IconButton>
                                </Tooltip>
                                <IconButton style={{float: 'right'}} disabled>
                                    <GroupAdd/>
                                </IconButton>
                            </Grid>
                    </Toolbar>
                </Grid>

                <TagsSection 
                    tags={this.props.note.tags}
                    noteId={this.props.note._id}
                    onUpdateTag={this.props.onUpdateNoteTags}
                />

                <Grid item xs={12} style={{minHeight: '600px', height: 'inherit'}}>
                    <Paper style={{minHeight: '600px', height: 'inherit', paddingTop: '15px', marginLeft: '15px', marginRight: '15px', marginTop: '15px'}}> 
                        <NoteStylesContainer />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default NoteEditor;