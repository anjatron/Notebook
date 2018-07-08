'use strict';

import {
    Grid,
    Typography,
    Toolbar,
    TextField,
    IconButton,
    Paper
} from '@material-ui/core';


import {
    GroupAdd,
    Save
} from '@material-ui/icons'

import ContentView from 'pages/components/contentView/contentView';
import BreadCrumbs from 'pages/components/common/breadCrumbs';
import LoadingContent from 'pages/components/common/loading';

import NotebookService from 'services/notebookService';

import utils from 'utils';

class FolderEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.clearViewingType();
    }

    setupPage(folderId, props) {
        if (folderId) {
            let folderExists = _.find(props.folders.slice(), (_folder) => {
                return _folder._id === folderId;
            });

            if (_.isEmpty(folderExists)) {
                // load folder data
                props.onGetFolder(folderId);
            } else {
                props.onOpenFolder(folderExists);
            }
        }
    }

    componentDidMount() {
        // check if it exists 
        this.setupPage(this.props.history.location.pathname.split('/')[2], this.props);
    }

    componentWillReceiveProps(nextProps) {
        let thisPath = nextProps.history.location.pathname.split('/')[2];
        if (nextProps.viewing && thisPath !== nextProps.viewing._id) {
            this.setupPage(thisPath, nextProps);
        }
    }

    handleName(event) {
        let name = event.target.value;

        this.props.onNameChange(this.props.viewing._id, name);
    }

    updateFolder() {
        NotebookService.createFolder(this.props.viewing);
    }

    render() {
        // show folder title and content view with its sub folders and notes displayed

        if (!this.props.viewing || this.props.viewing._id !== this.props.history.location.pathname.split('/')[2]) {
            return (
                <LoadingContent
                    message="Setting stuff up..."
                />
            );
        }

        let allFolders = (this.props.folders) ? this.props.folders.slice() : [];
        let allNotes = (this.props.notes) ? this.props.notes.slice() : [];

        let theseFolders = utils.getDataByPath(allFolders, this.props.viewing);
        let theseNotes = utils.getDataByPath(allNotes, this.props.viewing);

        return (
            <Grid id="folder-editor" container style={{overflowX: 'hidden'}}>
                <Grid item xs={12}>
                    <BreadCrumbs
                        history={this.props.history}
                        folders={this.props.folders.slice()}
                        notes={this.props.notes.slice()}
                        type='folder'
                        path={this.props.viewing.path}
                    />
                </Grid>
                <Grid item xs={12} style={{height: '60px'}}>
                    <Toolbar>
                            <Grid item xs={4}>
                                <TextField
                                    id="foldername"
                                    label="Folder Name"
                                    type="input"
                                    margin="normal"
                                    style={{color: '#ffff', margin: '0px'}}
                                    fullWidth={true}
                                    onChange={(event) => this.handleName(event)}
                                    defaultValue={this.props.viewing.name}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <IconButton style={{float: 'right'}} onClick={() => this.updateFolder()}>
                                    <Save/>
                                </IconButton>
                                <IconButton disabled style={{float: 'right'}}>
                                    <GroupAdd/>
                                </IconButton>
                            </Grid>
                    </Toolbar>
                </Grid>

                <Grid item xs={12} style={{minHeight: '600px', height: '100%'}}>
                    <Paper style={{minHeight: '600px', height: '100%', paddingTop: '15px', marginLeft: '15px', marginRight: '15px', marginTop: '15px'}}>
                        <ContentView 
                            {...this.props} 
                            isFolder={true}
                            folders={theseFolders}
                            notes={theseNotes}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}


export default FolderEditor;