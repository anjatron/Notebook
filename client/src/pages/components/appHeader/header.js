'use strict';

import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    IconButton,
    Tooltip
} from '@material-ui/core';

import {
    Home,
    NoteAdd,
    CreateNewFolder,
    AccountCircle
} from '@material-ui/icons';

import SearchNotebook from 'pages/components/appHeader/searchNotebook';

import utils from '../../../../utils';

import {createNote, createFolder} from 'sagas/saga';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    addNewFolder() {
        // need to create new folder
        // need to show folder in ContentView
        let newFolder = utils.createNewDataObj(_.clone(this.props.FolderTemplate),  _.cloneDeep(this.props), 'FOLDER-');

        let that = this;
        createFolder(newFolder).then(() => {
            that.props.history.push('/folder/' + newFolder._id);
        });
    }

    addNewNote() {
        let newNote = utils.createNewDataObj(_.clone(this.props.NoteTemplate), _.cloneDeep(this.props), 'NOTE-');
    
        let that = this;
        createNote(newNote).then(() => {
            that.props.history.push('/note/' + newNote._id);
        });
    }

    viewProfile() {
        // open account page for user
        this.props.history.push('/account');
    }

    openNote(noteId) {
        this.props.history.push('/note/' + noteId);
    }

    goHome() {
        if (this.props.history.location.pathname !== '/home') {

            if (!this.props.viewingType) {
                this.props.clearViewingType();
                this.props.history.push('/home');
            } else {
                let that = this;
                if (this.props.viewingType === 'folder') {
                    createFolder(this.props.viewing).then(() => {
                        that.props.history.push('/home');
                    });
                } else {
                    createNote(this.props.viewing).then(() => {
                        that.props.history.push('/home');
                    });
                }
            }
        }
    }

    showSearchComponent() {
        if (this.props.history.location.pathname === '/') {
           return '';
        }

        return (
            <SearchNotebook
                searchResults={this.props.searchResults}
                onSearchContent={this.props.onSearchContent}
                openNote={(note) => this.openNote(note)}
            />
        );
    }

    showCreateContentButtons() {
        if (this.props.viewingType === 'note' || this.props.history.location.pathname === '/') {
            return '';
        }

        return (
            <div>
                <Tooltip id="tooltip-addnote" title="Add note">
                    <IconButton onClick={() => this.addNewNote()}>
                        <NoteAdd/>
                    </IconButton>
                </Tooltip>
                <Tooltip id="tooltip-addfoler" title="Add folder">
                    <IconButton onClick={() => this.addNewFolder()}>
                        <CreateNewFolder/>
                    </IconButton>
                </Tooltip>
            </div>
        );
    }

    showHomeButton() {
        if (this.props.history.location.pathname === '/') {
            return '';
        } else {
            return (
                <Tooltip id="tooltip-home" title="Save and go home">
                    <IconButton style={{float: 'left'}} onClick={() => this.goHome()}>
                        <Home/>
                    </IconButton>
                </Tooltip>
            );
        }
    }

    showAccountButton() {
        if (this.props.history.location.pathname === '/') {
            return '';
        } else {
            return (
                <IconButton onClick={() => this.viewProfile()}>
                    <AccountCircle/>
                </IconButton>
            );
        }
    }

    render() {
        const SearchComponent = this.showSearchComponent();
        const CreateContentBtns = this.showCreateContentButtons();
        const HomeButton = this.showHomeButton();
        const AccountButton = this.showAccountButton();

        return (
            <div style={{flexGrow: 1}}>
                <AppBar 
                    position="static" 
                    color="primary"
                >
                    <Toolbar>
                            <Grid item xs={1}>
                                {HomeButton}
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="title" color="inherit">
                                    Notebook
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {SearchComponent}
                            </Grid>
                            <Grid item xs={2}>
                                {CreateContentBtns}
                            </Grid>
                            <Grid item xs={1}>
                                {AccountButton}
                            </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;